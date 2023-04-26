FROM node:16-bullseye-slim

RUN mkdir -p /shared-libs
WORKDIR /shared-libs

COPY . .
RUN npm ci --omit=dev

