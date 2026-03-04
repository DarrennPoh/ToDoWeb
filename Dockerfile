### use an official node.js runtime as a parent image 
FROM node:22-alpine 

### Set the working directory in the container 
WORKDIR /app

### copy file from local project to this env 
COPY package*.json .

### install the dependencies 
RUN npm install 

### copy the rest of the application code 
COPY prisma ./prisma/

### Generate Prisma Client
RUN npx prisma generate

### expose the port that the app runs on 
EXPOSE 5001 

### define the command that runs the application 
CMD ["node","./src/server.js"]