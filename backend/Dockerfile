# Use an official Node.js runtime with a specific version tag
FROM node:22-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package files first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies with ci for better reproducibility
RUN npm ci --only=production && \
    # Create a non-root user for security
    npm cache clean --force && \
    adduser --disabled-password --gecos "" nodeuser

# Copy only necessary files for the build
COPY --chown=nodeuser:nodeuser tsconfig*.json ./
COPY --chown=nodeuser:nodeuser src/ ./src/

# Build the application
RUN npm run build && \
    # Clean up source files after build to reduce image size
    rm -rf src/

# Set the user to non-root
USER nodeuser

# Expose the port the app runs on
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production

# Use a healthcheck to verify the app is running properly
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

# Run the app
CMD ["npm", "run", "start:prod"]