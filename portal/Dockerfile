# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=build-stage /app/dist/opm-portal /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf