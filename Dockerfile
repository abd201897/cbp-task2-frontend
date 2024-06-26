# Stage 1: Build the project
FROM node:20-alpine AS build

ARG environment
ENV environment ${environment}

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN echo $environment > .env.example
RUN sed 's/ \([^ ]*=\)/\n\1/g' .env.example > .env
COPY . .
RUN npm run build

# Stage 2: Use Nginx to serve the built files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
