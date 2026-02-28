#!/usr/bin/env python3
"""
Extract ultra-clean color palettes using the user's script.
"""

import json
import numpy as np
from PIL import Image
from collections import Counter
import requests
from io import BytesIO
import sys
import os

def get_ultra_clean_palette(image_path, tol=55):
    """Extract palette using user's script logic"""
    try:
        # Handle URL or file
        if image_path.startswith('http'):
            response = requests.get(image_path, timeout=30)
            img = Image.open(BytesIO(response.content)).convert('RGB')
        else:
            img = Image.open(image_path).convert('RGB')
        
        # Resize for faster processing
        img = img.resize((300, 300))
        
        pixels = np.array(img).reshape(-1, 3)
        total_pixels = len(pixels)
        
        # 1. Count exact Hex occurrences
        counts = Counter([tuple(p) for p in pixels])
        
        # 2. Drop all colors that take up less than 0.4%
        significant = [(np.array(c), count) for c, count in counts.items() if count / total_pixels > 0.004]
        significant.sort(key=lambda x: x[1], reverse=True)
        
        # 3. Merge identical/closely related shades
        merged = []
        for color, count in significant:
            found = False
            for i, (m_color, m_count) in enumerate(merged):
                if np.linalg.norm(color - m_color) < tol:
                    if count > m_count:
                        merged[i] = (color, m_count + count)
                    else:
                        merged[i] = (m_color, m_count + count)
                    found = True
                    break
            if not found:
                merged.append((color, count))
        
        # 4. Sort and cap at 8
        merged.sort(key=lambda x: x[1], reverse=True)
        merged = merged[:8]
        
        hex_pal = []
        for c, _ in merged:
            h = '#{:02x}{:02x}{:02x}'.format(int(c[0]), int(c[1]), int(c[2])).upper()
            if h not in hex_pal:
                hex_pal.append(h)
        
        return hex_pal
    except Exception as e:
        print(f"Error: {e}")
        return []

def main():
    # Load artworks
    with open('/Users/deepakdinesh/.openclaw/workspace/projects/spilledpalette-dev/data/artworks.json') as f:
        artworks = json.load(f)
    
    # Load existing metadata
    metadata_file = '/Users/deepakdinesh/.openclaw/workspace/projects/spilledpalette-dev/data/artwork-metadata.json'
    try:
        with open(metadata_file) as f:
            metadata = json.load(f)
    except:
        metadata = {}
    
    # Process each artwork
    processed = 0
    failed = 0
    
    for artwork in artworks:
        art_id = artwork['id']
        # Use the full resolution image for better palette extraction
        image_url = artwork.get('full') or artwork.get('url')
        
        if not image_url:
            print(f"Skipping {art_id}: no URL")
            continue
        
        print(f"Processing: {art_id}...")
        
        palette = get_ultra_clean_palette(image_url)
        
        if palette:
            metadata[art_id] = {'palette': palette}
            print(f"  -> {palette}")
            processed += 1
        else:
            print(f"  -> Failed")
            failed += 1
    
    # Save
    with open(metadata_file, 'w') as f:
        json.dump(metadata, f, indent=2)
    
    print(f"\nDone! Processed: {processed}, Failed: {failed}")

if __name__ == "__main__":
    main()
