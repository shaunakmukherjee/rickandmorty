FROM node:15-slim

LABEL version="1.0"
LABEL description="This is the base docker image for frontend/client part of the Highsnobiety coding challenge"
LABEL maintainer = ["shaunak.mukherjee94@gmail.com"]

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]