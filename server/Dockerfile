FROM node:17.0.1-slim

LABEL version="1.0"
LABEL description="This is the base docker image for backend/server part of the Highsnobiety coding challenge"
LABEL maintainer = ["shaunak.mukherjee94@gmail.com"]

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 4000

CMD ["yarn", "dev"]