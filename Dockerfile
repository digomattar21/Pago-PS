FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["yarn", "start"]

