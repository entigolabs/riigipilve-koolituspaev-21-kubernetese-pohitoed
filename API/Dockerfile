#Kasutame node 16
FROM node:16
#Määrame töötamise kausta
WORKDIR /app
#Määrame vaike väärtuse
ENV SESSION_SECRET="CHANGEME"
ENV REDIS_HOST="localhost"
#Rakenduse käivitamise käsk
CMD npm start
#Pane kood /app kausta
COPY . /app
#Ehitame rakenduse
RUN npm run build             
