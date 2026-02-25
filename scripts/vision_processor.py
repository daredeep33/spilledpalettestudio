import json
import sys
import os

# This script will be called in chunks or via sub-agents if needed
# For now, it's a helper to manage the JSON file state

METADATA_PATH = '/Users/deepakdinesh/Projects/spilledpalette/data/artwork-metadata.json'

def load_metadata():
    if os.path.exists(METADATA_PATH):
        try:
            with open(METADATA_PATH, 'r') as f:
                return json.load(f)
        except:
            return []
    return []

def save_metadata(data):
    # Ensure it's a list and deduplicate by ID
    seen = set()
    unique_data = []
    for item in data:
        if item['id'] not in seen:
            unique_data.append(item)
            seen.add(item['id'])
    
    with open(METADATA_PATH, 'w') as f:
        json.dump(unique_data, f, indent=2)

def add_entry(entry):
    data = load_metadata()
    data.append(entry)
    save_metadata(data)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        action = sys.argv[1]
        if action == "add":
            entry_json = sys.stdin.read()
            entry = json.loads(entry_json)
            add_entry(entry)
        elif action == "count":
            print(len(load_metadata()))
