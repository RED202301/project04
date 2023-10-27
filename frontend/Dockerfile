FROM node:18.16.1-alpine as builder
WORKDIR /usr/src/app
# WORKDIR /S09P31E206/frontend
COPY package.json .
RUN npm install
COPY ./ ./
# EXPOSE 5174
RUN npm run build
# CMD ["npm", "run", "dev", "--", "--host"]

FROM nginx
EXPOSE 5174
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html
