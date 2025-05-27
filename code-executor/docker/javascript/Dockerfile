# Use official Node.js base image
FROM node:22.16.0-alpine

# Create working directory
WORKDIR /app

# Copy runner script into container
COPY runner.sh .

# Make the script executable
RUN chmod +x runner.sh

# Set entrypoint
ENTRYPOINT ["./runner.sh"]
