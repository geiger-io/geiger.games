FROM ruby:3.2-alpine

# Install dependencies
RUN apk add --no-cache \
    build-base \
    git \
    nginx

# Set working directory
WORKDIR /srv/jekyll

# Install Jekyll and bundler
RUN gem install bundler jekyll

# Copy Gemfile and install dependencies
COPY Gemfile* ./
RUN bundle install || gem install jekyll jekyll-feed jekyll-sitemap

# Copy application files
COPY . /srv/jekyll/

# Build Jekyll site (this will process markdown posts and generate HTML)
RUN bundle exec jekyll build --destination /tmp/jekyll-build || jekyll build --destination /tmp/jekyll-build

# Create nginx html directory
RUN mkdir -p /usr/share/nginx/html

# Copy Jekyll-built files (news section, feed.xml, etc.)
RUN cp -r /tmp/jekyll-build/* /usr/share/nginx/html/ 2>/dev/null || true

# Copy static files that Jekyll excludes to nginx html directory
RUN cp -r js css img video /usr/share/nginx/html/ 2>/dev/null || true
RUN cp index.html 404.html robots.txt favicon.ico apple-touch-icon-precomposed.png crossdomain.xml /usr/share/nginx/html/ 2>/dev/null || true

# Configure nginx for SPA routing
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Handle client-side routing \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Cache static assets \
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
