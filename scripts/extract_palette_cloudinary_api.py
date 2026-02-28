#!/usr/bin/env python3
"""
Extract color palettes using Cloudinary API.
Filters out near-black, near-white, and gray colors.
"""

import cloudinary
import json
import sys
from pathlib import Path

# Configure Cloudinary
cloudinary.config(
    cloud_name='dzg9imnjl',
    api_key='269987287387435',
    api_secret='TCB-RRA_GRoO4JNNXwS-NCVcgMY'
)
import cloudinary.api

def is_valid_color(hex_code):
    """Filter: skip near-white (>F5), near-black (<15), or gray"""
    hex_code = hex_code.lstrip('#')
    r, g, b = int(hex_code[0:2], 16), int(hex_code[2:4], 16), int(hex_code[4:6], 16)
    
    # Skip near-white
    if r > 245 and g > 245 and b > 245:
        return False
    # Skip near-black
    if r < 20 and g < 20 and b < 20:
        return False
    # Skip grays (low saturation)
    max_c = max(r, g, b)
    min_c = min(r, g, b)
    if max_c - min_c < 20:
        return False
    return True

def get_palette(public_id, max_colors=5):
    """Get filtered palette from Cloudinary"""
    try:
        result = cloudinary.api.resource(public_id, colors=True)
        colors = result.get('colors', [])
        
        hex_palette = []
        for color_info in colors:
            hex_code = color_info[0]
            if is_valid_color(hex_code):
                hex_palette.append(hex_code)
                if len(hex_palette) >= max_colors:
                    break
        
        return hex_palette
    except Exception as e:
        print(f"Error: {e}")
        return []

def process_all():
    """Process all artworks"""
    data_dir = Path("/Users/deepakdinesh/.openclaw/workspace/projects/spilledpalette-dev/data")
    artworks_file = data_dir / "artworks.json"
    metadata_file = data_dir / "artwork-metadata.json"
    
    with open(artworks_file) as f:
        artworks = json.load(f)
    
    # Handle list format
    if isinstance(artworks, list):
        artworks = {a['id']: a for a in artworks}
    
    with open(metadata_file) as f:
        metadata = json.load(f)
    
    # Get list of resources from Cloudinary
    print("Getting Cloudinary resources...")
    resources = cloudinary.api.resources(type='upload', prefix='spilledpalette/artwork/')
    resource_map = {r['public_id']: r['public_id'].split('/')[-1] for r in resources.get('resources', [])}
    
    updated = 0
    for key, artwork in artworks.items():
        cloudinary_id = artwork.get('cloudinaryId')
        if not cloudinary_id:
            # Try to find in resource map
            continue
        
        print(f"Processing: {key}...")
        
        palette = get_palette(cloudinary_id)
        
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
    process_all()
