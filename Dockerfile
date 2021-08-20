FROM node:alpine

WORKDIR /usr/pp

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","run","start"]