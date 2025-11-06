FROM ruby:3.2-alpine

# Install dependencies
RUN apk add --no-cache \
    build-base \
    git \
    nginx

# Set working directory
WORKDIR /srv/jekyll

# Install bundler first (faster than installing all gems)
RUN gem install bundler --no-document

# Copy Gemfile and install dependencies (with no documentation for faster install)
COPY Gemfile* ./
RUN bundle config set --local without 'development test' && \
    bundle config set --local path 'vendor/bundle' && \
    bundle install --jobs 4 --retry 3 || \
    gem install jekyll jekyll-feed jekyll-sitemap --no-document

# Copy application files
COPY . /srv/jekyll/

# Note: Jekyll build is skipped here for faster development builds
# The docker-compose.yml runs Jekyll serve which builds on-the-fly
# For production builds, use docker-compose.prod.yml which builds the static site
