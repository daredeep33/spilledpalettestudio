#!/usr/bin/env python3
"""
Extract color palettes for all Spilled Palette artworks.
- Uses HSL filtering: skip L > 0.90, L < 0.15, S < 0.2
- Group similar colors (RGB distance < 45)
- Output exactly 6 colors per artwork
- Use w_1200 for higher-res images
"""

import json
import re
import colorsys
from pathlib import Path
import colorthief
import requests
from io import BytesIO

# Configuration
DATA_DIR = Path("/Users/deepakdinesh/Projects/spilledpalette/data")
ARTWORKS_FILE = DATA_DIR / "artworks.ts"
METADATA_FILE = DATA_DIR / "artwork-metadata.json"

def rgb_distance(c1, c2):
    """Calculate Euclidean distance between two RGB colors."""
    return ((c1[0] - c2[0])**2 + (c1[1] - c2[1])**2 + (c1[2] - c2[2])**2) ** 0.5

def rgb_to_hsl(r, g, b):
    """Convert RGB (0-255) to HSL (0-1)."""
    return colorsys.rgb_to_hls(r/255.0, g/255.0, b/255.0)

def should_include_color(rgb):
    """HSL filtering: skip near-white, near-black, or gray."""
    r, g, b = rgb
    h, l, s = rgb_to_hsl(r, g, b)
    # Skip if L > 0.90 (near-white), L < 0.15 (near-black), S < 0.2 (gray)
    if l > 0.90 or l < 0.15 or s < 0.2:
        return False
    return True

def group_similar_colors(colors, distance_threshold=45):
    """Group similar colors together (RGB distance < threshold)."""
    if not colors:
        return []
    
    groups = []
    for color in colors:
        added = False
        for group in groups:
            # Check distance to representative (first color in group)
            if rgb_distance(color, group[0]) < distance_threshold:
                group.append(color)
                added = True
                break
        if not added:
            groups.append([color])
    
    # Return average color from each group
    result = []
    for group in groups:
        avg_r = sum(c[0] for c in group) // len(group)
        avg_g = sum(c[1] for c in group) // len(group)
        avg_b = sum(c[2] for c in group) // len(group)
        result.append((avg_r, avg_g, avg_b))
    
    return result

def rgb_to_hex(rgb):
    """Convert RGB tuple to hex string."""
    return "#{:02X}{:02X}{:02X}".format(rgb[0], rgb[1], rgb[2])

def get_higher_res_url(url):
    """Replace w_800 with w_1200 for higher resolution."""
    return re.sub(r'w_\d+', 'w_1200', url)

def extract_palette(image_url, target_colors=6):
    """Extract palette from image using ColorThief with HSL filtering."""
    try:
        # Get higher-res image
        high_res_url = get_higher_res_url(image_url)
        
        # Download image
        response = requests.get(high_res_url, timeout=30)
        response.raise_for_status()
        
        # Load into ColorThief
        color_thief = colorthief.ColorThief(BytesIO(response.content))
        
        # Get palette with many colors to filter
        raw_palette = color_thief.get_palette(color_count=12, quality=1)
        
        if not raw_palette:
            return None
        
        # Filter by HSL criteria
        filtered_colors = [c for c in raw_palette if should_include_color(c)]
        
        # If not enough colors after filtering, use all non-filtered
        if len(filtered_colors) < target_colors:
            # Try with more colors
            raw_palette = color_thief.get_palette(color_count=24, quality=1)
            filtered_colors = [c for c in raw_palette if should_include_color(c)]
        
        # Group similar colors
        grouped = group_similar_colors(filtered_colors, distance_threshold=45)
        
        # Select up to target_colors (prefer diverse colors)
        if len(grouped) > target_colors:
            # Take evenly spaced colors for diversity
            step = len(grouped) / target_colors
            final_palette = [grouped[int(i * step)] for i in range(target_colors)]
        else:
            final_palette = grouped[:target_colors]
        
        # Convert to hex
        return [rgb_to_hex(c) for c in final_palette]
        
    except Exception as e:
        print(f"Error extracting palette: {e}")
        return None

def parse_artworks_ts():
    """Parse artworks.ts to extract IDs and preview URLs."""
    content = ARTWORKS_FILE.read_text()
    
    # Find all artwork entries with id and preview
    pattern = r'"id":\s*"([^"]+)".*?"preview":\s*"([^"]+)"'
    matches = re.findall(pattern, content, re.DOTALL)
    
    artworks = []
    for art_id, preview_url in matches:
        artworks.append({
            'id': art_id,
            'preview_url': preview_url
        })
    
    return artworks

def main():
    print("=" * 60)
    print("Extracting color palettes for ALL artworks")
    print("=" * 60)
    
    # Load existing metadata
    if METADATA_FILE.exists():
        metadata = json.loads(METADATA_FILE.read_text())
    else:
        metadata = {}
    
    # Parse artworks
    artworks = parse_artworks_ts()
    print(f"Found {len(artworks)} artworks")
    
    # Track updates
    updated = 0
    failed = 0
    
    for i, artwork in enumerate(artworks):
        art_id = artwork['id']
        preview_url = artwork['preview_url']
        
        print(f"[{i+1}/{len(artworks)}] Processing: {art_id}")
        
        # Extract palette
        palette = extract_palette(preview_url, target_colors=6)
        
        if palette:
            # Update metadata
            if art_id not in metadata:
                metadata[art_id] = {}
            
            metadata[art_id]['palette'] = palette
            updated += 1
            print(f"  → {len(palette)} colors: {palette[:3]}...")
        else:
            failed += 1
            print(f"  → FAILED to extract palette")
    
    # Save metadata
    METADATA_FILE.write_text(json.dumps(metadata, indent=2))
    
    print("=" * 60)
    print(f"COMPLETE: {updated} updated, {failed} failed")
    print(f"Metadata saved to: {METADATA_FILE}")
    print("=" * 60)

if __name__ == "__main__":
    main()
