FROM node:21 as test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm test


FROM node:21 as build-stage

WORKDIR /usr/src/app

COPY --from=test-stage /usr/src/app/ .

ENV VITE_BACKEND_URL=http://localhost:3000

RUN npm run build


FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html


# docker build -t front .
# docker run -p 5001:3000 front
