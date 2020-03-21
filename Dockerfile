FROM node:13
WORKDIR /app
COPY ./src/offene-ohren-api ./
EXPOSE 8000
CMD ["node", "."]