#!/usr/bin/env python3
"""Extract dominant colors from artwork preview images using PIL."""

import json
import re
import requests
from PIL import Image
from io import BytesIO
from collections import Counter
import time

def rgb_to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

def get_dominant_colors(image, num_colors=5):
    img = image.convert('RGB')
    img = img.resize((100, 100))
    pixels = list(img.getdata())
    color_counts = Counter(pixels)
    top_colors = color_counts.most_common(num_colors * 2)  # Get more to filter
    
    hex_colors = []
    for color, count in top_colors:
        r, g, b = color
        # Skip white/very light colors (likely background)
        if r > 240 and g > 240 and b > 240:
            continue
        hex_colors.append(rgb_to_hex(color))
        if len(hex_colors) >= num_colors:
            break
    
    return hex_colors[:num_colors]

def parse_artworks_ts(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    artworks_match = re.search(r'export const artworks: Artwork\[\] = \[(.*)', content, re.DOTALL)
    if not artworks_match:
        print("Could not find artworks array")
        return {}
    artworks_content = artworks_match.group(1)
    artwork_pattern = re.compile(r'"id":\s*"([^"]+)"[^}]*?"preview":\s*"([^"]+)"')
    artworks = {}
    for match in artwork_pattern.finditer(artworks_content):
        artworks[match.group(1)] = match.group(2)
    return artworks

def main():
    artworks = parse_artworks_ts('artworks.ts')
    print(f"Found {len(artworks)} artworks")
    
    with open('artwork-metadata.json', 'r') as f:
        metadata = json.load(f)
    
    success_count = 0
    error_count = 0
    
    for i, (artwork_id, preview_url) in enumerate(artworks.items()):
        print(f"[{i+1}/{len(artworks)}] {artwork_id}...", end=" ", flush=True)
        
        try:
            response = requests.get(preview_url, timeout=30)
            response.raise_for_status()
            img = Image.open(BytesIO(response.content))
            palette = get_dominant_colors(img, 5)
            
            if artwork_id in metadata:
                metadata[artwork_id]['palette'] = palette
                print(f"✓ {palette}")
            else:
                print(f"WARNING: not in metadata!")
            
            success_count += 1
            time.sleep(0.3)
            
        except Exception as e:
            print(f"ERROR: {e}")
            error_count += 1
    
    with open('artwork-metadata.json', 'w') as f:
        json.dump(metadata, f, indent=2)
    
    print(f"\nDone! Success: {success_count}, Errors: {error_count}")

if __name__ == '__main__':
    main()
