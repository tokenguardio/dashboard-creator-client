FROM node:18-alpine
WORKDIR /app
COPY package.json package-json.lock ./
RUN npm install
COPY ./ ./
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true
EXPOSE 3000
CMD ["npm", "run", "dev"]
