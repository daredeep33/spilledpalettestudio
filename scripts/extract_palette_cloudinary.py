#!/usr/bin/env python3
"""
Extract perfect color palettes using Cloudinary URL transformation.
- Cloudinary converts TIFF to PNG instantly (w_800,f_png,q_100)
- extcolors with tolerance=5 for flat, pure colors
- Fast: no heavy file downloads
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
    if r > 250 and g > 250 and b > 250:
        return False
    if r < 15 and g < 15 and b < 15:
        return False
    max_c = max(r, g, b)
    min_c = min(r, g, b)
    if max_c - min_c < 15:
        return False
    return True

def get_cloudinary_palette(cloudinary_url, max_colors=6, tolerance=5):
    """
    Extract palette using Cloudinary transformation + extcolors.
    - w_800: resize for fast processing
    - f_png: convert TIFF to clean PNG
    - q_100: highest quality
    - tolerance=5: strict, exact colors only
    """
    try:
        # Handle Cloudinary URLs
        url = image_url
        
        # Check if transformation already exists
        if 'q_auto' in url:
            # Replace q_auto,f_auto with our transformation
            url = url.replace('q_auto,f_auto', 'w_800,f_png,q_100')
        elif '/upload/' in url:
            # Add transformation after /upload/
            parts = url.split('/upload/')
            if len(parts) == 2:
                url = f"{parts[0]}/upload/w_800,f_png,q_100/{parts[1]}"
        
        # Fetch lightweight image
        response = requests.get(optimized_url, timeout=30, headers={'User-Agent': 'Mozilla/5.0'})
        img = Image.open(io.BytesIO(response.content))
        
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Extract with low tolerance for flat colors
        colors, pixel_count = extcolors.extract_from_image(
            img, 
            tolerance=tolerance, 
            limit=20
        )
        
        # Filter and convert to hex
        hex_palette = []
        for color, count in colors:
            if is_valid_color(color):
                hex_code = rgb_to_hex(color)
                hex_palette.append(hex_code)
                if len(hex_palette) >= max_colors:
                    break
        
        return hex_palette
        
    except Exception as e:
        print(f"Error: {e}")
        return []

def process_all_artworks():
    """Process all artworks from artworks.json"""
    data_dir = Path("/Users/deepakdinesh/.openclaw/workspace/projects/spilledpalette-dev/data")
    artworks_file = data_dir / "artworks.json"
    metadata_file = data_dir / "artwork-metadata.json"
    
    with open(artworks_file) as f:
        artworks = json.load(f)
    
    # Handle both array and object formats
    if isinstance(artworks, list):
        # Convert list to dict by id
        artworks = {a['id']: a for a in artworks}
    
    if metadata_file.exists():
        with open(metadata_file) as f:
            metadata = json.load(f)
    else:
        metadata = {}
    
    updated = 0
    for key, artwork in artworks.items():
        # Try 'full', 'url', or 'preview' fields
        image_url = artwork.get('full') or artwork.get('url') or artwork.get('preview')
        if not image_url:
            continue
        
        print(f"Processing: {key}...")
        
        palette = get_cloudinary_palette(image_url)
        
        if palette:
            if key not in metadata:
                metadata[key] = {}
            
            metadata[key]['palette'] = palette
            print(f"  -> {palette}")
            updated += 1
        else:
            print(f"  -> Failed")
    
    with open(metadata_file, 'w') as f:
        json.dump(metadata, f, indent=2)
    
    print(f"\nUpdated {updated} artworks")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--all":
        process_all_artworks()
    elif len(sys.argv) > 1:
        palette = get_cloudinary_palette(sys.argv[1])
        print(palette)
    else:
        print("Usage:")
        print("  python extract_palette_cloudinary.py <cloudinary_url>")
        print("  python extract_palette_cloudinary.py --all")
