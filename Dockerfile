FROM node:16-alpine

#Creates directories
RUN mkdir -p /usr/src/app

RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml /usr/src/app

RUN pnpm install --frozen-lockfile --prod

COPY . /usr/src/app

EXPOSE 3000

CMD pnpm run dev
