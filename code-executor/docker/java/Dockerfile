FROM openjdk:17-slim

# Set work directory
WORKDIR /usr/src/app

# Copy the runner script
COPY runner.sh /runner.sh

# Make runner executable
RUN chmod +x /runner.sh

# Set the default command to execute the runner
ENTRYPOINT ["/runner.sh"]
