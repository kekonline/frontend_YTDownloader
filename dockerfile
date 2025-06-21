
# Use an official Node.js image as the base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and lock file first (better build caching)
# COPY package.json package-lock.json ./
# COPY . .
COPY package*.json ./

# Install dependencies
# RUN npm install --omit=dev  # Omit dev dependencies for production builds
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port (optional, just for clarity)
EXPOSE 5173

# Default command to run the app
 CMD ["npm", "run", "dev"]


# docker build -t ytdownloader .
# docker run -p 5173:5173 ytdownloader
# docker run --env-file .env -p 5173:5173 YTDownloader
