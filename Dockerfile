FROM node:latest as build

WORKDIR /llm-frontend
COPY --chown=node:0 . /llm-frontend
RUN npm install ci --legacy-peer-deps
RUN npm run build \
 && mv /llm-frontend/public/ /llm-frontend/dist/public/

FROM node:latest

RUN npm install --global serve
COPY --from=build --chown=node:0 /llm-frontend/dist /dist
