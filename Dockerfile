FROM node:lts

WORKDIR /web_ui

COPY package.json yarn.lock ./

RUN yarn install --silent

COPY . .

EXPOSE 8080

CMD yarn dev