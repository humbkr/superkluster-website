# Build phase
FROM node:10.16.0-alpine

ENV PORT 3000

RUN apk add --no-cache --virtual .gyp python make g++

WORKDIR /app
ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --non-interactive

COPY . .
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
