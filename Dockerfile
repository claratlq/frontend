FROM node:latest as build

USER root

RUN apt-get update

WORKDIR /llm_frontend/

COPY . ./
RUN npm install --legacy-peer-deps
# RUN npm install react-scripts@3.4.1 -g --silent
# RUN npm install dotenv --save
