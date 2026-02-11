#!/bin/bash
# Quick setup script - run this after getting Cloudinary credentials

set -e

echo "Setting up Cloudinary credentials..."

# Check if credentials are provided as arguments or environment variables
if [ -z "$CLOUDINARY_CLOUD_NAME" ] && [ -z "$1" ]; then
    echo "❌ Please provide Cloudinary credentials:"
    echo ""
    echo "Option 1 - Set environment variables:"
    echo "  export CLOUDINARY_CLOUD_NAME='your_cloud_name'"
    echo "  export CLOUDINARY_API_KEY='your_api_key'"
    echo "  export CLOUDINARY_API_SECRET='your_api_secret'"
    echo ""
    echo "Option 2 - Pass as arguments:"
    echo "  ./set-credentials.sh <cloud_name> <api_key> <api_secret>"
    exit 1
fi

# Use arguments if provided
if [ ! -z "$1" ]; then
    CLOUD_NAME="$1"
    API_KEY="$2"
    API_SECRET="$3"
else
    CLOUD_NAME="$CLOUDINARY_CLOUD_NAME"
    API_KEY="$CLOUDINARY_API_KEY"
    API_SECRET="$CLOUDINARY_API_SECRET"
fi

# Save to .env.local
cat > ~/Projects/spilledpalette/.env.local << EOF
CLOUDINARY_CLOUD_NAME=$CLOUD_NAME
CLOUDINARY_API_KEY=$API_KEY
CLOUDINARY_API_SECRET=$API_SECRET
EOF

echo "✅ Credentials saved to .env.local"
echo ""

# Export for current session
export CLOUDINARY_CLOUD_NAME="$CLOUD_NAME"
export CLOUDINARY_API_KEY="$API_KEY"
export CLOUDINARY_API_SECRET="$API_SECRET"

echo "🚀 Starting upload of 139 artworks..."
node ~/Projects/spilledpalette/scripts/upload-artworks.js
