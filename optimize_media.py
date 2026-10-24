import os
import shutil
import subprocess
import time
import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
BACKUP_DIR = os.path.abspath("_masters_backup")

TARGET_DIRS = [
    os.path.join("assets", "works", "video_editing"),
    os.path.join("assets", "works", "commercial_videography"),
]

def get_video_dimensions(filepath):
    cmd = [
        FFMPEG, "-i", filepath
    ]
    res = subprocess.run(cmd, stderr=subprocess.PIPE, text=True, errors="replace")
    width, height = None, None
    for line in res.stderr.split("\n"):
        if "Stream #0:" in line and "Video:" in line:
            # Look for dimensions like 1920x1080 or 2160x3840
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
    filesize_mb = os.path.getsize(filepath) / (1024 * 1024)
    # If already smaller than 18 MB, no compression needed
    if filesize_mb <= 18:
        print(f"[SKIP] {filepath} ({filesize_mb:.1f} MB already optimized)")
        return

    rel_path = os.path.relpath(filepath)
    backup_path = os.path.join(BACKUP_DIR, rel_path)
    os.makedirs(os.path.dirname(backup_path), exist_ok=True)

    # 1. Backup original master if not already backed up
    if not os.path.exists(backup_path):
        print(f"[BACKUP] Backing up master to {backup_path}")
        shutil.copy2(filepath, backup_path)
    else:
        print(f"[BACKUP] Master already exists in backup: {backup_path}")

    # 2. Determine scaling filter
    width, height = get_video_dimensions(backup_path)
    if width and height:
        if width > height:
            # Landscape: max 1920 width, max 1080 height
            vf = "scale='min(1920,iw)':-2"
        else:
            # Portrait: max 1080 width
            vf = "scale='min(1080,iw)':-2"
    else:
        vf = "scale='min(1920,iw)':-2"

    temp_out = filepath + ".compressed.mp4"
    if os.path.exists(temp_out):
        os.remove(temp_out)

    print(f"[ENCODE] Compressing {rel_path} ({filesize_mb:.1f} MB, {width}x{height})...")
    t0 = time.time()
    cmd = [
        FFMPEG, "-y", "-i", backup_path,
        "-vf", vf,
        "-c:v", "libx264", "-crf", "25", "-preset", "faster",
        "-c:a", "aac", "-b:a", "128k",
        "-movflags", "+faststart",
        temp_out
    ]
    res = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        print(f"[ERROR] Encoding failed for {rel_path}: {res.stderr[-300:]}")
        if os.path.exists(temp_out):
            os.remove(temp_out)
        return

    new_size_mb = os.path.getsize(temp_out) / (1024 * 1024)
    duration = time.time() - t0

    # 3. Replace original file with compressed web version
    os.replace(temp_out, filepath)
    savings = (1 - new_size_mb / filesize_mb) * 100
    print(f"[SUCCESS] {rel_path}: {filesize_mb:.1f} MB -> {new_size_mb:.1f} MB ({savings:.1f}% saved) in {duration:.1f}s\n")

def main():
    print("=== STARTING VIDEO WEB-OPTIMIZATION ===")
    total_start = time.time()
    all_videos = []
    for d in TARGET_DIRS:
        if os.path.exists(d):
            for root, _, files in os.walk(d):
                for f in files:
                    if f.lower().endswith(".mp4"):
                        all_videos.append(os.path.join(root, f))

    all_videos.sort(key=lambda p: os.path.getsize(p), reverse=True)
    orig_total_mb = sum(os.path.getsize(p) for p in all_videos) / (1024 * 1024)
    print(f"Found {len(all_videos)} videos totaling {orig_total_mb:.1f} MB")

    for v in all_videos:
        optimize_video(v)

    new_total_mb = sum(os.path.getsize(p) for p in all_videos) / (1024 * 1024)
    print("=== OPTIMIZATION COMPLETE ===")
    print(f"Total size before: {orig_total_mb:.1f} MB")
    print(f"Total size after:  {new_total_mb:.1f} MB")
    print(f"Total space saved: {orig_total_mb - new_total_mb:.1f} MB ({(1 - new_total_mb/orig_total_mb)*100:.1f}%)")
    print(f"Total time elapsed: {time.time() - total_start:.1f}s")

if __name__ == "__main__":
    main()
