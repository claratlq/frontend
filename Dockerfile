FROM node:latest as build

WORKDIR /llm-frontend
COPY --chown=node:0 . /llm-frontend
RUN npm install ci --legacy-peer-deps

ENTRYPOINT ["npx", "vite", "serve", "--port", "3000"]