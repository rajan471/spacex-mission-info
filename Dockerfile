FROM node:10

# Create app directory
WORKDIR /app

# Copy source across
COPY . /app

# install dependencies
RUN npm install

# execute when docker start
CMD [ "npm", "run", "start" ]
