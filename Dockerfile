FROM node:14

RUN mkdir -p /server

EXPOSE 9000

WORKDIR /server

ADD ./ /server

RUN npm install
RUN npm build

CMD ["npm","start"]