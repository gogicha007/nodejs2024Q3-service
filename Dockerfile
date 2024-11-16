FROM node:alpine3.19 AS development

ENV NODE_VERSION 22.11.0

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install --legacy-peer-deps

COPY . .


RUN npx prisma generate 

# EXPOSE 3333
# CMD ["npm", "run", "start:migrate:prod"]
# CMD ["npm", "run", "start:migrate:dev"]

RUN npm run build
