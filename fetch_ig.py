import urllib.request
import re
import json
import os

urls = {
    'itisharita': 'https://www.instagram.com/itisharita/',
    'rainbowofmy_life': 'https://www.instagram.com/rainbowofmy_life/',
    'teja_reddyyss': 'https://www.instagram.com/teja_reddyyss/',
    'giri.editszone': 'https://www.instagram.com/giri.editszone/',
    'swathi_siara': 'https://www.instagram.com/swathi_siara/'
}

fb_headers = {
    'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'
}

results = {}
os.makedirs('assets/creators', exist_ok=True)

for name, u in urls.items():
    print(f"Fetching {name}...")
    try:
        req = urllib.request.Request(u, headers=fb_headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            desc = re.search(r'<meta\s+(?:property|name)=["\'](?:og:description|description)["\']\s+content=["\']([^"\']+)["\']', html)
            title = re.search(r'<meta\s+(?:property|name)=["\'](?:og:title|title)["\']\s+content=["\']([^"\']+)["\']', html)
            image = re.search(r'<meta\s+(?:property|name)=["\'](?:og:image)["\']\s+content=["\']([^"\']+)["\']', html)
            
            info = {
                'username': name,
                'url': u
            }
            if desc:
                d_str = desc.group(1)
                info['desc'] = d_str
                # Parse followers, following, posts
                # Example: "7,633 Followers, 21 Following, 261 Posts - See Instagram photos and videos from Harita Reddy158 (@itisharita)"
                m_foll = re.search(r'([\d,\.KkMm]+)\s+Followers', d_str)
                m_fing = re.search(r'([\d,\.KkMm]+)\s+Following', d_str)
                m_posts = re.search(r'([\d,\.KkMm]+)\s+Posts', d_str)
                m_name = re.search(r'videos from\s+([^(@]+)', d_str)
                
                info['followers'] = m_foll.group(1) if m_foll else '10K'
                info['following'] = m_fing.group(1) if m_fing else '100'
                info['posts'] = m_posts.group(1) if m_posts else '50'
                info['name'] = m_name.group(1).strip() if m_name else name
            if title:
                info['title'] = title.group(1)
            if image:
                img_url = image.group(1).replace('&amp;', '&')
                info['image_url'] = img_url
                # download image locally
                local_path = f'assets/creators/{name}.jpg'
                try:
                    img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(img_req, timeout=10) as img_resp, open(local_path, 'wb') as img_f:
                        img_f.write(img_resp.read())
                    info['local_image'] = local_path
                    print(f"Downloaded {name} image -> {local_path} ({os.path.getsize(local_path)} bytes)")
                except Exception as img_err:
                    print(f"Failed to download image for {name}: {img_err}")
            
            results[name] = info
    except Exception as e:
        print(f"Error fetching {name}: {e}")

with open('assets/creators/creators_data.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)

print("Saved to assets/creators/creators_data.json")
