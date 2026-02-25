# Cloudinary Artwork Upload

## Status: Ready for Credentials

All scripts are prepared. Just need Cloudinary credentials to upload 139 TIFF files.

## Quick Start

### Option 1: Set credentials via environment variables
```bash
export CLOUDINARY_CLOUD_NAME="your_cloud_name"
export CLOUDINARY_API_KEY="your_api_key"
export CLOUDINARY_API_SECRET="your_api_secret"
node ~/Projects/spilledpalette/scripts/upload-artworks.js
```

### Option 2: Use the setup script
```bash
cd ~/Projects/spilledpalette/scripts
./set-credentials.sh <cloud_name> <api_key> <api_secret>
```

## What the Script Does

1. **Categorizes** each image into 7 categories based on filename:
   - `sanctuary` - landscapes, sunsets, willow trees
   - `botanical` - vases, plants, leaves (default)
   - `modern` - line art, geometric, abstract shapes
   - `dreamers` - rainbows, soft, pastel
   - `dopamine` - bright, fun, smiley
   - `ink` - typography, sketches
   - `patterns` - repeating designs

2. **Uploads** to Cloudinary with:
   - TIFF → JPG conversion
   - Auto quality optimization
   - Auto format selection (WebP/AVIF where supported)

3. **Generates URLs** for 4 sizes:
   - `url` - Original uploaded image
   - `thumb` - 400px width
   - `preview` - 800px width
   - `full` - 1600px width

4. **Outputs** `~/Projects/spilledpalette/data/artworks.json`

## Expected Output

```json
{
  "id": "abstract-botanical-art",
  "title": "Abstract Botanical Art",
  "category": "botanical",
  "cloudinaryId": "spilledpalette/abstract-botanical-art",
  "url": "https://res.cloudinary.com/...",
  "thumb": "https://res.cloudinary.com/.../w_400/...",
  "preview": "https://res.cloudinary.com/.../w_800/...",
  "full": "https://res.cloudinary.com/.../w_1600/..."
}
```

## Files

- `upload-artworks.js` - Main upload script
- `set-credentials.sh` - Helper to set credentials and run upload
- `setup-cloudinary.sh` - Instructions for manual setup

## Source Files

139 TIFF files in: `~/Downloads/website/`

## Output File

`~/Projects/spilledpalette/data/artworks.json`
