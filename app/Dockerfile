
FROM node:12.14.1-alpine

RUN apk update --no-cache

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

CMD node dist/index.js