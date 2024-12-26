
ARG BASE_IMAGE=node
ARG BASE_VERSION=slim

FROM ${BASE_IMAGE}:${BASE_VERSION}

ARG APPLICATION_DIR=/usr/cassiopeia

WORKDIR ${APPLICATION_DIR}

ADD package.json ${APPLICATION_DIR}/
ADD sources/index.js ${APPLICATION_DIR}/sources/

EXPOSE 8443

RUN npm install

CMD npm run start:debug
