FROM node AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install -g @ionic/cli
RUN npm install -g @angular/cli

COPY . .
RUN npm run build

RUN yarn build

FROM nginx:stable

COPY ./www/ /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx -g 'daemon off;'"]