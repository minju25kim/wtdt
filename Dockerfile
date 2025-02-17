# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.2.0
FROM oven/bun:${BUN_VERSION}-slim AS base

LABEL fly_launch_runtime="Bun"

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential pkg-config python-is-python3

# Set build-time environment variable
ENV NODE_ENV=production

# Install node modules
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

# Copy application code
COPY . .

# Build application
RUN --mount=type=secret,id=SUPABASE_URL \
    --mount=type=secret,id=SUPABASE_ANON_KEY \
    SUPABASE_URL="$(cat /run/secrets/SUPABASE_URL)" \
    SUPABASE_ANON_KEY="$(cat /run/secrets/SUPABASE_ANON_KEY)" \
    bun run build

# Copy public assets to output directory
RUN mkdir -p .output/public && \
    cp -r public/* .output/public/ 2>/dev/null || true && \
    cp -r .vinxi/build/client/_build/* .output/public/

# Remove development dependencies and reinstall production deps
RUN rm -rf node_modules && \
    bun install --frozen-lockfile

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/.output /app/.output
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/bun.lock /app/bun.lock

# Install only production dependencies
RUN bun install --production --frozen-lockfile

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD ["bun", "--bun", "run", ".output/server/index.mjs"]
