#!/bin/bash
# Script to test locally exactly like GitHub Pages

echo "Building Jekyll site (like GitHub Pages)..."
echo ""

# Check if Jekyll is available
if command -v bundle &> /dev/null && [ -f Gemfile ]; then
    echo "Using Bundler to build with GitHub Pages compatible Jekyll..."
    bundle install
    bundle exec jekyll build
elif command -v jekyll &> /dev/null; then
    echo "Using system Jekyll to build..."
    jekyll build
else
    echo "Jekyll not found. Please install Jekyll."
    echo ""
    echo "To install Jekyll:"
    echo "  gem install bundler jekyll"
    echo "  bundle install"
    echo ""
    echo "Or run Docker manually:"
    echo "  docker-compose -f docker-compose.prod.yml up -d"
    exit 1
fi

if [ ! -d "_site" ]; then
    echo "Error: _site directory not created. Build failed."
    exit 1
fi

echo ""
echo "✓ Jekyll build complete!"
echo ""
echo "Serving built site from _site directory..."
echo "Access at: http://localhost:4000"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Serve the built site (not the source)
cd _site

# Try to use Python's built-in server (most common)
if command -v python3 &> /dev/null; then
    python3 -m http.server 4000
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 4000
elif command -v ruby &> /dev/null; then
    ruby -run -e httpd . -p 4000
else
    echo "No suitable HTTP server found. Please install Python or Ruby."
    echo "Or use Docker: docker-compose -f docker-compose.prod.yml up -d"
    exit 1
fi
