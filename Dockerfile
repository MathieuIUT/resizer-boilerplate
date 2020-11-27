FROM node:14

ENV NODE_ENV=production

# RUN npm install -g sails

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . /usr/src/app

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
#COPY . .

#EXPOSE 8080

EXPOSE 1337
CMD npm run start