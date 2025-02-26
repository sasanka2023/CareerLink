# Use a Node.js image to build the frontend
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files separately to optimize Docker cache
COPY ./package.json ./package-lock.json ./

RUN npm ci --legacy-peer-deps \
    --registry=https://registry.yarnpkg.com \
    --fetch-timeout=600000 \
    --fetch-retries=5

# Copy the rest of the app
COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve the React app
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
