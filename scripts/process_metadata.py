import json
import re
import os

# Read the artworks.ts file
path = '/Users/deepakdinesh/Projects/spilledpalette/data/artworks.ts'
with open(path, 'r') as f:
    content = f.read()

# Extract the artworks array
# Looking for the start of the array and the end
start_marker = 'export const artworks: Artwork[] = ['
start_idx = content.find(start_marker)
if start_idx == -1:
    start_marker = 'export const artworks = ['
    start_idx = content.find(start_marker)

if start_idx != -1:
    # Get everything from '[' to the end
    json_part = content[start_idx + len(start_marker) - 1:]
    # Find the matching closing bracket
    bracket_count = 0
    end_idx = -1
    for i, char in enumerate(json_part):
        if char == '[':
            bracket_count += 1
        elif char == ']':
            bracket_count -= 1
            if bracket_count == 0:
                end_idx = i
                break
    
    if end_idx != -1:
        json_str = json_part[:end_idx + 1]
        # Clean up for JSON parsing
        # Remove trailing commas
        json_str = re.sub(r',\s*([\]\}])', r'\1', json_str)
        # Handle cases where keys might not be quoted (unlikely in this file based on read)
        
        try:
            artworks = json.loads(json_str)
            print(f"LOADED:{len(artworks)}")
            for artwork in artworks:
                print(f"IMAGE:{artwork['id']}|{artwork['thumb']}")
        except Exception as e:
            print(f"ERROR:JSON parse failed: {str(e)}")
            # Fallback regex for IDs and Thumbs if JSON fails
            ids = re.findall(r'"id":\s*"([^"]+)"', json_str)
            thumbs = re.findall(r'"thumb":\s*"([^"]+)"', json_str)
            print(f"LOADED:{len(ids)}")
            for i in range(len(ids)):
                print(f"IMAGE:{ids[i]}|{thumbs[i]}")
else:
    print("ERROR:Artworks array not found")
