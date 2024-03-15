# Use the official Node.js image as a base
FROM node:latest AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY PruebaTecnicaIvanVargasMinData/package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY PruebaTecnicaIvanVargasMinData .

# Build the Angular application in production mode
RUN npm run build

# Use nginx as the final base image
FROM nginx:latest

# Copy the built Angular app to the nginx public directory
COPY --from=builder /app/dist/PruebaTecnicaIvanVargasMinData /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
