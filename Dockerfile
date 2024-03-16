# Use the official Node.js image as a base
FROM node:18-alpine3.11 as Angular

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install


# Copy the rest of the application code
COPY . .

# Build the Angular application in production mode
RUN ng build --prod

# Use nginx as the final base image
FROM nginx:alpine

# Copy the built Angular app to the nginx public directory
COPY --from=Angular /app/dist/projects /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
