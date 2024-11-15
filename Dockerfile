FROM node:alpine3.19

ENV NODE_VERSION 22.11.0

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# RUN npm install
COPY . .


# COPY prisma ./prisma/
# RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npx prisma generate 

# EXPOSE 3333
# RUN npm run build
# CMD ["npm", "run", "start:migrate:prod"]
CMD ["npm", "run", "start:migrate:dev"]
# CMD ["npm", "run", "watch"]
