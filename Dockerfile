# Use an official Python runtime as a parent image
FROM alpine:latest

RUN apk add curl

WORKDIR /htdocs

COPY htdocs /htdocs
COPY update_modules.sh /

RUN sh /update_modules.sh

CMD ["sh", "-c", "cp -rfv -t /data /htdocs/*"]
