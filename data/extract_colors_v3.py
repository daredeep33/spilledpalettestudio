#!/usr/bin/env python3
"""Extract dominant colors from artwork preview images using PIL with proper filtering and grouping."""

import json
import re
import requests
from PIL import Image
from io import BytesIO
from collections import Counter
import time
import math

def rgb_to_hex(rgb):
    return '#{:02X}{:02X}{:02X}'.format(rgb[0], rgb[1], rgb[2])

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def color_distance(c1, c2):
    """Calculate Euclidean distance between two RGB colors."""
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(c1, c2)))

def is_gray(color, threshold=10):
    """Check if pure gray (R a color is a≈G≈B within threshold)."""
    r, g, b = color
    return abs(r - g) <= threshold and abs(g - b) <= threshold and abs(r - b) <= threshold

def get_hue(rgb):
    """Calculate hue of an RGB color (for sorting)."""
    r, g, b = rgb[0]/255.0, rgb[1]/255.0, rgb[2]/255.0
    max_c = max(r, g, b)
    min_c = min(r, g, b)
    
    if max_c == min_c:
        return -1  # Grays have no hue
    
    diff = max_c - min_c
    
    if max_c == r:
        hue = ((g - b) / diff) % 6
    elif max_c == g:
        hue = (b - r) / diff + 2
    else:
        hue = (r - g) / diff + 4
    
    return hue * 60  # Convert to degrees (0-360)

def get_dominant_colors(image, num_colors=5):
    """Extract dominant colors with proper filtering and grouping."""
    img = image.convert('RGB')
    
    # Resize for faster processing
    img = img.resize((150, 150))
    pixels = list(img.getdata())
    total_pixels = len(pixels)
    
    # Count all colors
    color_counts = Counter(pixels)
    
    # Filter and collect valid colors with percentages
    valid_colors = []
    for color, count in color_counts.items():
        r, g, b = color
        
        # Filter 1: Skip very light colors (>240,240,240)
        if r > 240 and g > 240 and b > 240:
            continue
        
        # Filter 2: Skip very dark colors (<15,15,15)
        if r < 15 and g < 15 and b < 15:
            continue
        
        # Filter 3: Skip pure grays (R≈G≈B within 10)
        if is_gray(color, threshold=10):
            continue
        
        percentage = (count / total_pixels) * 100
        
        valid_colors.append({
            'rgb': color,
            'count': count,
            'percentage': percentage
        })
    
    # Save copy before filtering
    valid_colors_all = valid_colors.copy()
    
    # Determine threshold - be more aggressive for sparse images
    # Start with 0.5%, but keep lowering until we have enough colors
    min_threshold = 0.5
    valid_colors = valid_colors_all.copy()
    
    while len(valid_colors) < num_colors and min_threshold > 0.01:
        min_threshold = min_threshold / 2
        valid_colors = [c for c in valid_colors_all if c['percentage'] >= min_threshold]
    
    # Sort by percentage (most dominant first)
    valid_colors.sort(key=lambda x: x['percentage'], reverse=True)
    
    # Group similar colors (distance < 35)
    grouped_colors = []
    for color_data in valid_colors:
        color = color_data['rgb']
        merged = False
        
        for grouped in grouped_colors:
            if color_distance(color, grouped['rgb']) < 35:
                # Merge: add counts and recalculate percentage
                grouped['count'] += color_data['count']
                grouped['percentage'] = (grouped['count'] / total_pixels) * 100
                merged = True
                break
        
        if not merged:
            grouped_colors.append(color_data.copy())
    
    # Re-sort by percentage after grouping
    grouped_colors.sort(key=lambda x: x['percentage'], reverse=True)
    
    # Take top 5
    top_colors = grouped_colors[:num_colors]
    
    # Sort final 5 by hue for visual appeal (Rainbow: Red→Orange→Yellow→Green→Blue→Purple)
    def hue_sort_key(c):
        hue = get_hue(c['rgb'])
        if hue < 0:  # Grays (shouldn't happen at this point)
            return 999
        return hue
    
    top_colors.sort(key=hue_sort_key)
    
    # Convert to hex
    hex_palette = [rgb_to_hex(c['rgb']) for c in top_colors]
    
    return hex_palette

def parse_artworks_ts(filepath):
    """Parse artworks.ts to extract IDs and preview URLs."""
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Find artworks array
    artworks_match = re.search(r'export const artworks: Artwork\[\] = \[(.*)', content, re.DOTALL)
    if not artworks_match:
        print("Could not find artworks array")
        return {}
    
    artworks_content = artworks_match.group(1)
    
    # Match id and preview fields
    artwork_pattern = re.compile(r'"id":\s*"([^"]+)"[^}]*?"preview":\s*"([^"]+)"')
    artworks = {}
    for match in artwork_pattern.finditer(artworks_content):
        artworks[match.group(1)] = match.group(2)
    
    return artworks

def main():
    data_dir = '/Users/deepakdinesh/Projects/spilledpalette/data'
    artworks = parse_artworks_ts(f'{data_dir}/artworks.ts')
    print(f"Found {len(artworks)} artworks")
    
    # Load existing metadata
    with open(f'{data_dir}/artwork-metadata.json', 'r') as f:
        metadata = json.load(f)
    
    success_count = 0
    error_count = 0
    skipped_count = 0
    
    for i, (artwork_id, preview_url) in enumerate(artworks.items()):
        print(f"[{i+1}/{len(artworks)}] {artwork_id}...", end=" ", flush=True)
        
        # Check if in metadata
        if artwork_id not in metadata:
            print(f"SKIP: not in metadata")
            skipped_count += 1
            continue
        
        try:
            response = requests.get(preview_url, timeout=30)
            response.raise_for_status()
            img = Image.open(BytesIO(response.content))
            
            palette = get_dominant_colors(img, 5)
            
            metadata[artwork_id]['palette'] = palette
            print(f"✓ {palette}")
            
            success_count += 1
            time.sleep(0.3)  # Rate limiting
            
        except Exception as e:
            print(f"ERROR: {e}")
            error_count += 1
    
    # Save updated metadata
    with open(f'{data_dir}/artwork-metadata.json', 'w') as f:
        json.dump(metadata, f, indent=2)
    
    print(f"\n=== DONE ===")
    print(f"Success: {success_count}")
    print(f"Errors: {error_count}")
    print(f"Skipped (not in metadata): {skipped_count}")

if __name__ == '__main__':
    main()
