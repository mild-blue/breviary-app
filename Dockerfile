FROM node AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install -g @ionic/cli
RUN npm install -g @angular/cli

COPY . .
RUN npm run build

FROM nginx:stable

COPY --from=build /app/www/ /var/www
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx"]