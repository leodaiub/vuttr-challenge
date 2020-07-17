FROM node:12

RUN mkdir /app
WORKDIR /app

COPY package.json /app
COPY .env /app

RUN node -v
RUN npm install