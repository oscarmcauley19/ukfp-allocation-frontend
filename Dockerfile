# Base image
FROM node:22.14.0-bookworm-slim

# set working directory
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 5173

# start app
CMD ["npm", "run", "dev"]