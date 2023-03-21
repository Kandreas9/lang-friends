FROM node:16-alpine

RUN npm i -g pnpm

RUN mkdir /app
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 3000

CMD pnpm run dev
