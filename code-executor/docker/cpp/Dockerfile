FROM alpine:latest

# Install necessary tools
RUN apk add --no-cache g++ gcc musl-dev

# Optional: Clean unnecessary binaries (optional, lightweight image)
RUN rm -f /usr/libexec/gcc/*/*/cc1obj || true && \
    rm -f /usr/libexec/gcc/*/*/lto1 || true && \
    rm -f /usr/libexec/gcc/*/*/lto-wrapper || true && \
    rm -f /usr/bin/*-gcj || true

WORKDIR /app

COPY runner.sh .
RUN chmod +x runner.sh

ENTRYPOINT ["./runner.sh"]
