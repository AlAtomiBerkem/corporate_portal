FROM node:20-alpine

WORKDIR /usr/src/app

# Install build dependencies
RUN apk add --no-cache python3 make g++

COPY package*.json ./

# Install dependencies
RUN npm install --force

COPY . .

EXPOSE 5000
CMD ["node", "index.js"]