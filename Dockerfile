FROM node:latest

USER root

RUN apt-get update 

RUN mkdir /llm_frontend

WORKDIR /llm_frontend/

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY .env ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install dotenv --save
