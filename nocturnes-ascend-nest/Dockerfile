FROM node:8

WORKDIR /usr/src/app

ENV NODE_ENV default

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD NODE_ENV=$NODE_ENV node start.js
