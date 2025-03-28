ARG DOCKERHUB
# Base image
FROM node:21-alpine3.18

# set working directory
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 5173

# start app
CMD ["npm", "run", "dev"]