FROM node:8

WORKDIR /usr/src/app

ENV LANG='en_US.UTF-8' LANGUAGE='en_US.UTF-8' LC_ALL='en_US.UTF-8'
ENV NODE_ENV default

RUN echo "deb http://archive.debian.org/debian stretch main" > /etc/apt/sources.list
RUN apt-get update && \
    apt-get install -y locales && \
    locale-gen en_US.UTF-8

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD NODE_ENV=$NODE_ENV node start.js
