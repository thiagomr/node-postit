FROM mhart/alpine-node:6

WORKDIR /src

COPY package.json .
RUN npm install

COPY . .

EXPOSE 8000
CMD ["node", "node-postit.js"]
