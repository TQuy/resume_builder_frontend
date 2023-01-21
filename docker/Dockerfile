FROM node:16.15-alpine AS builder
ARG REACT_APP_BACKEND_HOST
ENV NODE_ENV production
ENV REACT_APP_BACKEND_HOST ${REACT_APP_BACKEND_HOST}
WORKDIR /app
COPY package* /app/
RUN npm install --only=production
COPY . .
RUN npm run build

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder  /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 81
CMD ["nginx", "-g", "daemon off;"]
