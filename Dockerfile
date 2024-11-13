FROM node:alpine3.19

ENV NODE_VERSION 22.11.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build

