FROM node:14

RUN mkdir -p /server

WORKDIR /server

ADD ./ /server

RUN npm install
RUN npm run build

CMD ["npm","start"]