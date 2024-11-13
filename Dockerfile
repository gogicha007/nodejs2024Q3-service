FROM node:alpine3.19

ENV NODE_VERSION 22.11.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY prisma ./prisma/

RUN npx prisma generate --schema=./prisma/schema.prisma
# RUN npx prisma db push
# RUN npx prisma migrate deploy


RUN npm run build

