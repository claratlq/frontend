FROM registry.gitlab.com/gaia6974605/images/nodejs:18.18.2 as dependencies

WORKDIR /llm-frontend
COPY --chown=node:node . /llm-frontend
RUN npm install --legacy-peer-deps

FROM registry.gitlab.com/gaia6974605/images/nodejs:18.18.2 as build

WORKDIR /llm-frontend
COPY --chown=node:node . /llm-frontend
COPY --from=dependencies --chown=node:node /llm-frontend/node_modules /llm-frontend/node_modules
RUN npm run build

FROM registry.gitlab.com/gaia6974605/images/nginx:1.25.3-distroless

COPY --from=build /llm-frontend/dist /usr/share/nginx/html
COPY ../infra/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD nginx -t || exit 1
