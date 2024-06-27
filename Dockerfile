# Stage 1: Build Angular application and Node.js back-end
FROM node:latest AS build

WORKDIR /app

# Build the Angular application
# Copy Angular project files
COPY obligatorio-bd2-front/package*.json obligatorio-bd2-front/
WORKDIR /app/obligatorio-bd2-front
RUN npm install
COPY obligatorio-bd2-front/ ./
RUN npm run build

# Build the Node.js back-end application
WORKDIR /app
# Copy package.json and package-lock.json for backend
COPY obligatorio-bd2-back/package*.json obligatorio-bd2-back/
WORKDIR /app/obligatorio-bd2-back
RUN npm install

# Copy the rest of the backend application code
COPY obligatorio-bd2-back/ ./
# Install TypeScript
RUN npm install -g typescript
# Compile TypeScript to JavaScript
RUN tsc

# Stage 2: Setup the final environment
FROM node:22-alpine

WORKDIR /usr/src/app

# Copy the built Angular app from the first stage
COPY --from=build /app/obligatorio-bd2-front/dist/penca-bd2/browser /usr/src/app/public

# Copy the compiled back-end app from the first stage
COPY --from=build /app/obligatorio-bd2-back/dist /usr/src/app/dist
COPY --from=build /app/obligatorio-bd2-back/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port the server will run on
EXPOSE 3000

# Start the server
CMD ["node", "dist/index.js"]
