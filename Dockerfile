FROM node:lts-alpine3.16
RUN apk update && apk add bash

WORKDIR /var/www/

COPY package.json ./

RUN npm install
COPY . .

COPY ./scripts /usr/local/bin/

RUN chmod +x -R /usr/local/bin

EXPOSE 80

ENTRYPOINT ["start.sh"]
