FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --production

# Copy app source code
COPY . .

# Create uploads directory
RUN mkdir -p public/uploads

# Expose port (will use the PORT env variable at runtime)
EXPOSE 3000

# Start the app
CMD ["node", "server.js"] 