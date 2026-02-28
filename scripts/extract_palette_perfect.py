#!/usr/bin/env python3
"""
Extract perfect color palettes for all artworks.
- Uses extcolors frequency counting (ignores anti-aliasing)
- Filters out near-white and near-black
- Outputs to artwork-metadata.json
"""

import extcolors
import json
import sys
from pathlib import Path
from PIL import Image
import io
import requests
import os

def rgb_to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2]).lower()

def is_valid_color(rgb):
    """Filter: skip near-white (>250), near-black (<15), or gray (low saturation)"""
    r, g, b = rgb
    # Skip near-white
    if r > 250 and g > 250 and b > 250:
        return False
    # Skip near-black
    if r < 15 and g < 15 and b < 15:
        return False
    # Skip grays (low saturation)
    max_c = max(r, g, b)
    min_c = min(r, g, b)
    if max_c - min_c < 15:
        return False
    return True

def get_perfect_palette(image_source, max_colors=6, tolerance=12):
    """
    Extract palette using extcolors with filtering.
    """
    try:
        # Handle both URLs and local files
        if image_source.startswith('http'):
            response = requests.get(image_source, timeout=30, headers={'User-Agent': 'Mozilla/5.0'})
            img = Image.open(io.BytesIO(response.content))
        else:
            img = Image.open(image_source)
        
        # Convert to RGB if needed
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize for faster processing
        img = img.resize((200, 200), Image.Resampling.LANCZOS)
        
        # Extract colors with tolerance
        colors, pixel_count = extcolors.extract_from_image(
            img, 
            tolerance=tolerance, 
            limit=20
        )
        
        # Convert to hex and filter valid colors
        hex_palette = []
        for color, count in colors:
            if is_valid_color(color):
                hex_code = rgb_to_hex(color)
                percentage = round((count / pixel_count) * 100, 2)
                hex_palette.append(hex_code)
                if len(hex_palette) >= max_colors:
                    break
        
        return hex_palette
        
    except Exception as e:
        print(f"Error: {e}")
        return []

def process_all_artworks():
    """Process all artworks from artworks.json"""
    # Load artworks data
    data_dir = Path("/Users/deepakdinesh/.openclaw/workspace/projects/spilledpalette-dev/data")
    artworks_file = data_dir / "artworks.json"
    metadata_file = data_dir / "artwork-metadata.json"
    
    with open(artworks_file) as f:
        artworks = json.load(f)
    
    # Load existing metadata
    if metadata_file.exists():
        with open(metadata_file) as f:
            metadata = json.load(f)
    else:
        metadata = {}
    
    # Process each artwork
    updated = 0
    for key, artwork in artworks.items():
        if 'url' not in artwork:
            continue
        
        image_url = artwork['url']
        print(f"Processing: {key}...")
        
        palette = get_perfect_palette(image_url)
        
        if palette:
            # Update metadata
            if key not in metadata:
                metadata[key] = {}
            
            metadata[key]['palette'] = palette
            print(f"  -> {palette}")
            updated += 1
        else:
            print(f"  -> Failed to extract")
    
    # Save updated metadata
    with open(metadata_file, 'w') as f:
        json.dump(metadata, f, indent=2)
    
    print(f"\nUpdated {updated} artworks with new palettes")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--all":
        process_all_artworks()
    elif len(sys.argv) > 1:
        palette = get_perfect_palette(sys.argv[1])
        print(palette)
    else:
        print("Usage:")
        print("  python extract_palette_perfect.py <image_url>")
        print("  python extract_palette_perfect.py --all  (process all artworks)")
