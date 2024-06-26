# Stage 1: Build the Angular application
FROM node:latest AS build

WORKDIR /app

# Copy Angular project
COPY obligatorio-bd2-front/package*.json obligatorio-bd2-front/
WORKDIR /app/obligatorio-bd2-front
RUN npm install
COPY obligatorio-bd2-front/ .
RUN npm run build

# Stage 2: Setup the server
FROM node:latest

WORKDIR /app

# Copy server project
COPY obligatorio-bd2-back/package*.json obligatorio-bd2-back/
WORKDIR /app/obligatorio-bd2-back
RUN npm install

# Copy the built Angular app from the previous stage
COPY --from=build /app/obligatorio-bd2-front/dist/penca-bd2/browser /app/obligatorio-bd2-back/public/

# Copy the rest of the server source code
COPY obligatorio-bd2-back/ .

# Expose the port the server will run on
EXPOSE 3000

# Start the server
CMD ["node", "dist/index.js"]