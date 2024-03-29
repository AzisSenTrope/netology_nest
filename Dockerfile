FROM node:16

WORKDIR /app

COPY  ./ ./
RUN npm i

CMD ["npm", "run", "start"]