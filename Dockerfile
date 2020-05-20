FROM node:10
WORKDIR /../../FoodLog.Api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9090
CMD [ "node", "server.js" ]