# stage1 - build react app first 
FROM node:18-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN apk add --no-cache yarn
RUN npm install
COPY . .
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
