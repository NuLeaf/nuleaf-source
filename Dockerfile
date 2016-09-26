FROM node:slim
MAINTAINER Nuleaf Technologies

COPY ./nuleaf-source /nuleaf-source
RUN cd /nuleaf-source \
  && npm install

ENTRYPOINT ["node", "/nuleaf-source/server.js"]