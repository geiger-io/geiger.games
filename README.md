# Geiger.io Website

A modern JavaScript-based website optimized for GitHub Pages. This site has been modernized from PHP to a pure JavaScript/HTML application with Jekyll for the news section.

## Requirements

- Docker
- Docker Compose (optional)

## Getting Started

### Build and Run with Docker Compose

1. Build and start the container:
   ```bash
   docker-compose up -d
   ```

2. Access the website at:
   ```
   http://localhost:8080
   ```

### Build and Run with Docker

1. Build the Docker image:
   ```bash
   docker build -t geiger-website .
   ```

2. Run the container (with volume mount for development):
   ```bash
   docker run --rm -d -p 8080:80 -v "$(pwd):/srv/jekyll" --name geiger-website geiger-website
   ```
   
   Or use docker-compose:
   ```bash
   docker-compose up -d
   ```
   
   The container will automatically build the Jekyll site (converting markdown posts to HTML) when it starts.

3. Access the website at:
   ```
   http://localhost:8080
   ```

## Development

### View Logs

```bash
docker-compose logs -f
```

### Stop the Container

```bash
docker stop geiger-website
```

Or with docker-compose:
```bash
docker-compose down
```

### Rebuild After Changes

```bash
docker-compose up -d --build
```

## Project Structure

### Modern JavaScript Application

- `index.html` - Main entry point
- `js/app.js` - Main application controller
- `js/router.js` - Client-side router
- `js/components/` - Reusable components (Header, Footer)
- `js/pages/` - Page components (Home, Apps, Books, Web, Contact, News)
- `css/` - Stylesheets
- `js/plugins.js` - jQuery plugins (responsiveSlides)
- `img/` - Images

### Jekyll Structure (for News Section)

- `_posts/` - Markdown source files for news posts
- `_layouts/` - Jekyll layouts (post.html, default.html)
- `_includes/` - Jekyll includes (header.html, footer.html, head.html)
- `_config.yml` - Jekyll configuration
- `news/index.html` - News listing page (processed by Jekyll)

### Legacy PHP Files (kept for reference)

- `*.php` - Original PHP files (no longer used)
- `postmark.php` - Postmark email library (not used in modern version)

## Architecture

The site has been modernized to use:

- **ES6 Modules** - Modern JavaScript module system
- **Component-based architecture** - Reusable header/footer components
- **Client-side routing** - Single Page Application (SPA) with JavaScript router
- **Vanilla JavaScript** - Minimal dependencies (jQuery only for responsiveSlides plugin)
- **Static site** - No server-side processing required
- **Nginx** - Lightweight web server for static files

## Features

- Interactive homepage with name input and smart routing
- Image galleries with slider functionality
- Responsive design
- Client-side navigation without page reloads
- All original functionality preserved

## Local Development with Docker

### Development Mode (Auto-rebuild on changes)

For development, use the default docker-compose which runs Jekyll in watch mode:

```bash
docker-compose up -d
```

This will:
- **Automatically rebuild** when you change any markdown files in `_posts/`
- **Watch for changes** in layouts, includes, and config files
- **Serve the site** at `http://localhost:8080`
- **No need to rebuild** the container or restart - just edit markdown files and refresh your browser!

The Jekyll server watches for file changes and rebuilds automatically. Just edit your markdown files and the changes will be live within seconds.

### Production Mode (Static build)

For production/testing the final static build:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

This builds a static site (like GitHub Pages) and serves it with nginx.

## GitHub Pages Setup

1. Push your code to a GitHub repository
2. Go to Settings > Pages in your repository
3. Select your branch (usually `main` or `master`)
4. GitHub Pages will automatically build and deploy your site using Jekyll

### Important Notes for GitHub Pages

- **Base URL**: If your site is at `username.github.io/repo-name`, update `baseurl` in `_config.yml` to `/repo-name`
- **Jekyll Processing**: The main site files (index.html, js/, css/, img/) are excluded from Jekyll processing but still served as static files
- **News Section**: The news section uses Jekyll to process markdown files from `_posts/`
- **Adding News Posts**: Add new markdown files to `_posts/` with the format `YYYY-MM-DD-title.md`

### Example News Post

Create a file in `_posts/` like `2024-11-06-example-post.md`:

```markdown
---
layout: post
title: "Example Post"
date: 2024-11-06 10:00:00
categories: news
---

Your post content here.
```

## Notes

- This project does not require a database
- The website is now a pure static site (no PHP needed)
- Main site uses JavaScript SPA architecture
- News section uses Jekyll for markdown processing
- Original PHP files are archived in `archive/` folder
- Client-side routing handles navigation for the main site

