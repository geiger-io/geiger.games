#!/bin/bash
# Script to test locally exactly like GitHub Pages

echo "Building Jekyll site (like GitHub Pages)..."
echo ""

# Check if Jekyll is available
if command -v bundle &> /dev/null && [ -f Gemfile ]; then
    echo "Using Bundler to build with GitHub Pages compatible Jekyll..."
    if bundle install 2>/dev/null; then
        bundle exec jekyll build
    else
        echo "Bundler install failed, trying system Jekyll..."
        if command -v jekyll &> /dev/null; then
            jekyll build
        else
            echo "Jekyll not found. Checking for Docker..."
            echo ""
            if command -v docker &> /dev/null; then
                echo "Using Docker to build and serve (like GitHub Pages)..."
                docker-compose -f docker-compose.prod.yml up -d --build
                echo ""
                echo "✓ Docker container started!"
                echo ""
                echo "Access at: http://localhost:8080"
                echo ""
                echo "To stop: docker-compose -f docker-compose.prod.yml down"
                exit 0
            else
                echo "Docker not found. Please install Jekyll or Docker."
                echo ""
                echo "To fix bundler issue:"
                echo "  bundle update --bundler"
                echo "  or"
                echo "  gem install bundler:2.7.2"
                echo ""
                echo "Or install Docker:"
                echo "  https://docs.docker.com/get-docker/"
                exit 1
            fi
        fi
    fi
elif command -v jekyll &> /dev/null; then
    echo "Using system Jekyll to build..."
    jekyll build
else
    echo "Jekyll not found. Checking for Docker..."
    echo ""
    if command -v docker &> /dev/null; then
        echo "Using Docker to build and serve (like GitHub Pages)..."
        docker-compose -f docker-compose.prod.yml up -d --build
        echo ""
        echo "✓ Docker container started!"
        echo ""
        echo "Access at: http://localhost:8080"
        echo ""
        echo "To stop: docker-compose -f docker-compose.prod.yml down"
        exit 0
    else
        echo "Docker not found. Please install Jekyll or Docker."
        echo ""
        echo "To install Jekyll:"
        echo "  gem install bundler jekyll"
        echo "  bundle install"
        echo ""
        echo "Or install Docker:"
        echo "  https://docs.docker.com/get-docker/"
        exit 1
    fi
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
