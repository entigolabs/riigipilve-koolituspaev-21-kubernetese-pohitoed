#Kasutame node 16
FROM node:16-slim as build
#Määrame töötamise kausta
WORKDIR /app
#Pane kood /app kausta
COPY . /app
#Ehitame HTML
RUN npm install && npm run build          
#Kasutame nginxi
FROM nginx:1.20-alpine                 
#Kopeerime eelmises konteineris ehitatud HTMLi
COPY --from=build /app/build /usr/share/nginx/html
