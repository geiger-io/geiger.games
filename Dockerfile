FROM ruby:3.2-alpine

# Install dependencies
RUN apk add --no-cache \
    build-base \
    git \
    nginx

# Set working directory
WORKDIR /srv/jekyll

# Install bundler first
RUN gem install bundler --no-document

# Copy Gemfile and install dependencies globally (so they persist with volume mounts)
COPY Gemfile* ./
RUN if [ -f Gemfile ]; then \
        bundle config set --global path '/usr/local/bundle' && \
        bundle install --jobs 4 --retry 3; \
    else \
        gem install jekyll jekyll-feed jekyll-sitemap --no-document; \
    fi

# Copy application files
COPY . /srv/jekyll/

# Note: Jekyll build is skipped here for faster development builds
# The docker-compose.yml runs Jekyll serve which builds on-the-fly
# For production builds, use docker-compose.prod.yml which builds the static site
