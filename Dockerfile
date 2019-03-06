# Build the thing
FROM node:latest as BUILDER

RUN yarn global add @quasar/cli

COPY . /build

WORKDIR /build

RUN yarn && quasar build

# Run the thing
FROM nginx:alpine

LABEL maintainer="zachary.teska@gmail.com"

COPY --from=BUILDER /build/dist /usr/share/nginx/html
