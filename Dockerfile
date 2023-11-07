FROM node:20.9.0-alpine as build
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/frontend.mm.ru.crt /etc/nginx/ssl/frontend.mm.ru.crt
COPY --from=build /app/frontend.mm.ru.key /etc/nginx/ssl/frontend.mm.ru.key
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
