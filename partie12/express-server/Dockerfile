FROM node:21

WORKDIR /usr/src/app

COPY . .

RUN npm ci --omit=dev

ENV DEBUG=playground:*

CMD npm start
