FROM registry.gitlab.com/gaia6974605/images/nginx:1.25.2-distroless

COPY ./dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]
