FROM node:latest as build

USER root
WORKDIR /llm_frontend
COPY . /llm_frontend
RUN npm install ci && npm run build
ENTRYPOINT ["npx", "vite", "serve", "--port", "3000"]