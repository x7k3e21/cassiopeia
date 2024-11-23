
ARG BASE_IMAGE=node
ARG BASE_VERSION=23.3.0-slim

FROM ${BASE_IMAGE}:${BASE_VERSION}

ARG WORKING_DIR=/usr/cassiopeia

WORKDIR ${WORKING_DIR}

COPY package.json ${WORKING_DIR}/
COPY sources ${WORKING_DIR}/sources

RUN npm install

CMD npm run start
