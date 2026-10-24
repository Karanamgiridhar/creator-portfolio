"""
Full Media Optimization Script for creator-portfolio
=====================================================
- Backs up ALL originals to _masters_backup/ before touching anything
- Compresses images (JPG/PNG) to optimized WebP (visually lossless, quality 85)
- Compresses videos (MP4) to web-optimized H.264 with CRF 23 (high quality)
- Updates all code references (.html, .js, .css) to point to new .webp files
- Sets video preload to "none" in projects.js to save bandwidth
"""

import os
import re
import sys
import shutil
import subprocess
import time
from PIL import Image

# Fix Windows console encoding for Unicode filenames
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.stderr.reconfigure(encoding='utf-8', errors='replace')

try:
    import imageio_ffmpeg
    FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
except ImportError:
    FFMPEG = "ffmpeg"

BACKUP_DIR = os.path.abspath("_masters_backup")
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

# Directories to scan for media
MEDIA_DIRS = [
    "assets",
]

# Files to update code references in
CODE_FILES = [
    "index.html",
    "projects.html",
    os.path.join("js", "app.js"),
    os.path.join("js", "data.js"),
    os.path.join("js", "projects.js"),
    os.path.join("css", "style.css"),
    os.path.join("css", "theme.css"),
]

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".bmp", ".tiff"}
VIDEO_EXTS = {".mp4", ".mov"}
SKIP_EXTS = {".webp", ".svg", ".gif", ".ico"}  # Already optimized formats

# ─────────────────────────────────────────────
# IMAGE OPTIMIZATION
# ─────────────────────────────────────────────
def optimize_image(filepath):
    """Convert image to WebP at quality 85 (visually lossless). Returns new path or None."""
    ext = os.path.splitext(filepath)[1].lower()
    if ext not in IMAGE_EXTS:
        return None

    original_size = os.path.getsize(filepath)
    # Skip tiny images (< 50 KB) - already fine
    if original_size < 50 * 1024:
        print(f"  [SKIP-IMG] {filepath} ({original_size/1024:.1f} KB - already small)")
        return None

    # Skip if already converted (webp exists from prior run)
    webp_check = os.path.splitext(filepath)[0] + ".webp"
    if os.path.exists(webp_check):
        print(f"  [SKIP-IMG] {filepath} (already converted to .webp)")
        return webp_check

    rel_path = os.path.relpath(filepath, PROJECT_ROOT)
    backup_path = os.path.join(BACKUP_DIR, rel_path)

    # Backup original
    os.makedirs(os.path.dirname(backup_path), exist_ok=True)
    if not os.path.exists(backup_path):
        shutil.copy2(filepath, backup_path)
        print(f"  [BACKUP]  {rel_path}")

    # Convert to WebP
    webp_path = os.path.splitext(filepath)[0] + ".webp"
    try:
        img = Image.open(filepath)
        # Convert CMYK/palette to RGB
        if img.mode in ("CMYK", "P", "LA", "PA"):
            img = img.convert("RGBA" if "A" in img.mode else "RGB")
        elif img.mode == "RGBA":
            pass  # keep alpha
        else:
            img = img.convert("RGB")

        # Cap max dimension to 2560px for web (keeps quality, reduces pixels)
        max_dim = 2560
        if max(img.size) > max_dim:
            ratio = max_dim / max(img.size)
            new_size = (int(img.size[0] * ratio), int(img.size[1] * ratio))
            img = img.resize(new_size, Image.LANCZOS)

        img.save(webp_path, "WEBP", quality=85, method=4)
        new_size_bytes = os.path.getsize(webp_path)
        savings = (1 - new_size_bytes / original_size) * 100

        # Remove old file if webp is different path
        if os.path.normpath(webp_path) != os.path.normpath(filepath):
            os.remove(filepath)

        print(f"  [IMG-OK]  {rel_path}: {original_size/(1024*1024):.2f} MB -> {new_size_bytes/(1024*1024):.2f} MB ({savings:.0f}% saved)")
        return webp_path
    except Exception as e:
        print(f"  [IMG-ERR] {rel_path}: {e}")
        return None


# ─────────────────────────────────────────────
# VIDEO OPTIMIZATION
# ─────────────────────────────────────────────
def get_video_info(filepath):
    """Get video dimensions using ffmpeg."""
    cmd = [FFMPEG, "-i", filepath]
    res = subprocess.run(cmd, stderr=subprocess.PIPE, text=True, errors="replace")
    width, height = None, None
    for line in res.stderr.split("\n"):
        if "Stream #0:" in line and "Video:" in line:
            parts = line.split(",")
            for p in parts:
                p = p.strip()
                tokens = p.split(" ")[0].split("x")
                if len(tokens) == 2 and tokens[0].isdigit() and tokens[1].isdigit():
                    width, height = int(tokens[0]), int(tokens[1])
                    break
            if width and height:
                break
    return width, height


def optimize_video(filepath):
    """Compress video with H.264, CRF 23, web-optimized. Returns True if compressed."""
    original_size = os.path.getsize(filepath)
    original_mb = original_size / (1024 * 1024)

    # Skip review videos (already small ~1 MB)
    if original_mb <= 2.0:
        print(f"  [SKIP-VID] {filepath} ({original_mb:.1f} MB - already small)")
        return False

    rel_path = os.path.relpath(filepath, PROJECT_ROOT)
    backup_path = os.path.join(BACKUP_DIR, rel_path)

    # Backup original
    os.makedirs(os.path.dirname(backup_path), exist_ok=True)
    if not os.path.exists(backup_path):
        shutil.copy2(filepath, backup_path)
        print(f"  [BACKUP]  {rel_path}")

    # Determine scaling: landscape max 1280px wide, portrait max 720px wide
    source_path = backup_path if os.path.exists(backup_path) else filepath
    width, height = get_video_info(source_path)
    if width and height:
        if width > height:
            # Landscape
            vf = "scale='min(1280,iw)':-2"
        else:
            # Portrait
            vf = "scale='min(720,iw)':-2"
    else:
        vf = "scale='min(1280,iw)':-2"

    temp_out = filepath + ".temp_compressed.mp4"
    if os.path.exists(temp_out):
        os.remove(temp_out)

    print(f"  [ENCODE]  {rel_path} ({original_mb:.1f} MB, {width}x{height})...")
    t0 = time.time()

    cmd = [
        FFMPEG, "-y", "-i", source_path,
        "-vf", vf,
        "-c:v", "libx264",
        "-crf", "23",
        "-preset", "medium",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        "-pix_fmt", "yuv420p",
        temp_out
    ]
    res = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, text=True, errors="replace")

    if res.returncode != 0:
        print(f"  [VID-ERR] {rel_path}: encoding failed")
        if os.path.exists(temp_out):
            os.remove(temp_out)
        return False

    new_size = os.path.getsize(temp_out)
    new_mb = new_size / (1024 * 1024)
    savings = (1 - new_size / original_size) * 100
    elapsed = time.time() - t0

    os.replace(temp_out, filepath)
    print(f"  [VID-OK]  {rel_path}: {original_mb:.1f} MB -> {new_mb:.1f} MB ({savings:.0f}% saved) [{elapsed:.0f}s]")
    return True


# ─────────────────────────────────────────────
# CODE REFERENCE UPDATER
# ─────────────────────────────────────────────
def update_code_references(rename_map):
    """Update all .html, .js, .css files to reference new filenames."""
    if not rename_map:
        print("\n  No image renames to update in code.")
        return

    print(f"\n{'='*60}")
    print(f" UPDATING CODE REFERENCES ({len(rename_map)} renames)")
    print(f"{'='*60}")

    for code_file in CODE_FILES:
        full_path = os.path.join(PROJECT_ROOT, code_file)
        if not os.path.exists(full_path):
            continue

        with open(full_path, "r", encoding="utf-8") as f:
            content = f.read()

        original_content = content
        changes = 0
        for old_ref, new_ref in rename_map.items():
            # Normalize to forward slashes for web paths
            old_web = old_ref.replace("\\", "/")
            new_web = new_ref.replace("\\", "/")
            if old_web in content:
                content = content.replace(old_web, new_web)
                changes += 1

        if content != original_content:
            with open(full_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"  [CODE]    {code_file}: {changes} reference(s) updated")
        else:
            print(f"  [CODE]    {code_file}: no changes needed")


def fix_video_preload():
    """Change preload='metadata' to preload='none' in projects.js to prevent auto-download."""
    proj_js = os.path.join(PROJECT_ROOT, "js", "projects.js")
    if not os.path.exists(proj_js):
        return

    with open(proj_js, "r", encoding="utf-8") as f:
        content = f.read()

    new_content = content.replace('preload="metadata"', 'preload="none"')
    if new_content != content:
        with open(proj_js, "w", encoding="utf-8") as f:
            f.write(new_content)
        print('  [PRELOAD] projects.js: changed preload="metadata" -> preload="none"')


# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────
def main():
    print("=" * 60)
    print(" FULL MEDIA OPTIMIZATION")
    print(" Backing up originals -> _masters_backup/")
    print("=" * 60)

    os.makedirs(BACKUP_DIR, exist_ok=True)
    start_time = time.time()

    # Collect all media files
    all_images = []
    all_videos = []
    for media_dir in MEDIA_DIRS:
        full_dir = os.path.join(PROJECT_ROOT, media_dir)
        for root, dirs, files in os.walk(full_dir):
            for f in files:
                fp = os.path.join(root, f)
                ext = os.path.splitext(f)[1].lower()
                if ext in IMAGE_EXTS:
                    all_images.append(fp)
                elif ext in VIDEO_EXTS:
                    all_videos.append(fp)

    # Sort by size (biggest first)
    all_images.sort(key=lambda p: os.path.getsize(p), reverse=True)
    all_videos.sort(key=lambda p: os.path.getsize(p), reverse=True)

    total_orig_img = sum(os.path.getsize(p) for p in all_images)
    total_orig_vid = sum(os.path.getsize(p) for p in all_videos)

    # ─── PHASE 1: IMAGES ───
    print(f"\n{'='*60}")
    print(f" PHASE 1: IMAGE OPTIMIZATION ({len(all_images)} images, {total_orig_img/(1024*1024):.1f} MB)")
    print(f"{'='*60}")

    rename_map = {}
    for img_path in all_images:
        rel_before = os.path.relpath(img_path, PROJECT_ROOT)
        result = optimize_image(img_path)
        if result:
            rel_after = os.path.relpath(result, PROJECT_ROOT)
            if rel_before != rel_after:
                rename_map[rel_before] = rel_after

    # Also detect already-converted .webp files from prior run
    # (original .jpg/.png was already deleted, only .webp remains)
    for media_dir in MEDIA_DIRS:
        full_dir = os.path.join(PROJECT_ROOT, media_dir)
        for root, dirs, files in os.walk(full_dir):
            for f in files:
                if f.lower().endswith('.webp'):
                    webp_path = os.path.join(root, f)
                    base = os.path.splitext(webp_path)[0]
                    for orig_ext in ['.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG']:
                        orig_rel = os.path.relpath(base + orig_ext, PROJECT_ROOT)
                        webp_rel = os.path.relpath(webp_path, PROJECT_ROOT)
                        # If original no longer exists but backup does, add to rename map
                        if not os.path.exists(base + orig_ext) and orig_rel not in rename_map:
                            backup_check = os.path.join(BACKUP_DIR, orig_rel)
                            if os.path.exists(backup_check):
                                rename_map[orig_rel] = webp_rel

    # ─── PHASE 2: VIDEOS ───
    print(f"\n{'='*60}")
    print(f" PHASE 2: VIDEO OPTIMIZATION ({len(all_videos)} videos, {total_orig_vid/(1024*1024):.1f} MB)")
    print(f"{'='*60}")

    for vid_path in all_videos:
        optimize_video(vid_path)

    # ─── PHASE 3: UPDATE CODE ───
    update_code_references(rename_map)

    # ─── PHASE 4: FIX VIDEO PRELOAD ───
    print(f"\n{'='*60}")
    print(f" PHASE 3: FIX VIDEO PRELOAD SETTINGS")
    print(f"{'='*60}")
    fix_video_preload()

    # ─── FINAL REPORT ───
    # Re-scan for new totals
    new_img_total = 0
    new_vid_total = 0
    for media_dir in MEDIA_DIRS:
        full_dir = os.path.join(PROJECT_ROOT, media_dir)
        for root, dirs, files in os.walk(full_dir):
            for f in files:
                fp = os.path.join(root, f)
                ext = os.path.splitext(f)[1].lower()
                sz = os.path.getsize(fp)
                if ext in IMAGE_EXTS or ext == ".webp":
                    new_img_total += sz
                elif ext in VIDEO_EXTS:
                    new_vid_total += sz

    elapsed = time.time() - start_time
    print(f"\n{'='*60}")
    print(f" OPTIMIZATION COMPLETE")
    print(f"{'='*60}")
    print(f"  Images:  {total_orig_img/(1024*1024):.1f} MB -> {new_img_total/(1024*1024):.1f} MB  (saved {(total_orig_img - new_img_total)/(1024*1024):.1f} MB)")
    print(f"  Videos:  {total_orig_vid/(1024*1024):.1f} MB -> {new_vid_total/(1024*1024):.1f} MB  (saved {(total_orig_vid - new_vid_total)/(1024*1024):.1f} MB)")
    combined_orig = total_orig_img + total_orig_vid
    combined_new = new_img_total + new_vid_total
    print(f"  TOTAL:   {combined_orig/(1024*1024):.1f} MB -> {combined_new/(1024*1024):.1f} MB  (saved {(combined_orig - combined_new)/(1024*1024):.1f} MB, {(1 - combined_new/combined_orig)*100:.0f}%)")
    print(f"  Time:    {elapsed:.0f}s ({elapsed/60:.1f} min)")
    print(f"\n  Originals backed up to: {BACKUP_DIR}")
    print(f"  You can safely delete _masters_backup/ once you verify everything looks good.")


if __name__ == "__main__":
    main()
