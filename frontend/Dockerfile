FROM node:18.16.1-alpine as builder
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY ./ ./
RUN npm run build
EXPOSE 5173

# FROM nginx
# EXPOSE 5173
# COPY ./default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html
