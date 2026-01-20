# Stage 1: Build stage
FROM node:20-alpine AS build

# 1. Set the working directory
WORKDIR /app

# 2. Accept build-time arguments
# These must match the names in your docker-compose 'args' section
ARG VITE_API_URL

# 3. Copy package files and install dependencies
# Using 'npm ci' ensures a clean, reproducible install from package-lock.json
COPY package.json package-lock.json* ./
RUN npm ci

# 4. Copy the rest of the source code
# Ensure you have a .dockerignore to skip node_modules and dist
COPY . .

# 5. Set Environment Variable for the build process
# Vite requires variables to be present DURING the build command
ENV VITE_API_URL=$VITE_API_URL

# 6. Build the application
RUN npm run build


# Stage 2: Production stage (Nginx)
FROM nginx:alpine

# 7. Copy built static files from the build stage
# Vite outputs to 'dist/' by default
COPY --from=build /app/dist /usr/share/nginx/html

# 8. Copy your custom nginx config
# This is crucial for handling React Router / Single Page App routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 9. Security: Disable Nginx version tagging in headers
RUN sed -i '1i server_tokens off;' /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]