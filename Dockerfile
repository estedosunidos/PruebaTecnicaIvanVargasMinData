# Use the official Node.js image as a base
FROM node:18-alpine3.19 as Angular

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install


# Copy the rest of the application code
COPY . .

