# Use a lighter version of Node as a parent image
FROM node:10
RUN apt-get update
RUN apt-get --assume-yes install ffmpeg
WORKDIR ./
COPY package*.json ./
RUN npm install --production
COPY dist ./dist
EXPOSE 8080
CMD ["npm", "run", "prod"]
