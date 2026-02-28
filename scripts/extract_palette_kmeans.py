#!/usr/bin/env python3
"""
Extract perfect color palettes using user's new script with KMeans clustering.
"""

import numpy as np
from PIL import Image
from sklearn.cluster import KMeans
import warnings
import cloudinary
import json
import requests
from io import BytesIO

warnings.filterwarnings("ignore")

# Configure Cloudinary
cloudinary.config(
    cloud_name='dzg9imnjl',
    api_key='269987287387435',
    api_secret='TCB-RRA_GRoO4JNNXwS-NCVcgMY'
)
import cloudinary.api

def get_perfect_palette(secure_url, max_art_colors=8):
    """Extract palette using user's KMeans script"""
    try:
        # Download image
        response = requests.get(secure_url, timeout=30)
        if response.status_code != 200:
            return None
        
        img = Image.open(BytesIO(response.content)).convert('RGB')
        img.thumbnail((600, 600), Image.Resampling.NEAREST)
        pixels = np.array(img).reshape(-1, 3)
        
        # Over-segment to catch thin lines
        np.random.seed(42)
        sample_size = min(30000, len(pixels))
        sample_pixels = pixels[np.random.choice(len(pixels), sample_size, replace=False)]
        
        kmeans = KMeans(n_clusters=12, random_state=42, n_init='auto').fit(sample_pixels)
        labels = kmeans.predict(pixels)
        
        # Find exact pure colors for each cluster
        clusters = []
        for i in range(12):
            mask = labels == i
            if not np.any(mask):
                continue
            c_pixels = pixels[mask]
            u_colors, counts = np.unique(c_pixels, axis=0, return_counts=True)
            best_c = u_colors[np.argmax(counts)]
            pct = len(c_pixels) / len(pixels) * 100
            if pct >= 0.2:  # Keep if >0.2%
                clusters.append({'color': best_c, 'pct': pct})
        
        # Merge similar shades (tolerance=40)
        merged = []
        for cl in sorted(clusters, key=lambda x: x['pct'], reverse=True):
            found = False
            for m in merged:
                if np.linalg.norm(cl['color'] - m['color']) < 40:
                    m['pct'] += cl['pct']
                    found = True
                    break
            if not found:
                merged.append(cl)
        
        # Sort and cap
        merged.sort(key=lambda x: x['pct'], reverse=True)
        merged = merged[:max_art_colors]
        
        hex_palette = []
        for m in merged:
            c = m['color']
            hex_code = '#{:02x}{:02x}{:02x}'.format(int(c[0]), int(c[1]), int(c[2])).upper()
            hex_palette.append(hex_code)
        
        return hex_palette
    except Exception as e:
        print(f"Error: {e}")
        return None

# Get all resources
resources = cloudinary.api.resources(type='upload', prefix='spilledpalette/artwork/', max_results=200)

# Load existing metadata
metadata = {}

for r in resources.get('resources', []):
    pid = r['public_id']
    fname = pid.split('/')[-1]
    secure_url = r.get('secure_url')
    
    print(f"Processing: {fname}...")
    
    palette = get_perfect_palette(secure_url)
    
    if palette:
        metadata[fname] = {'palette': palette}
        print(f"  -> {palette}")
    else:
        print(f"  -> Failed")

# Save
with open('/Users/deepakdinesh/.openclaw/workspace/projects/spilledpalette-dev/data/artwork-metadata.json', 'w') as f:
    json.dump(metadata, f, indent=2)

print(f"\nDone! Processed {len(metadata)} artworks")
