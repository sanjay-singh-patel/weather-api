# Use an official Node.js runtime as the base image
FROM node:21.5.0-alpine As development
# Set the working directory in the Docker image
WORKDIR /usr/src

# Copy package.json and package-lock.json into the Docker image
COPY --chown=node:node package*.json ./

# Install the application dependencies inside the Docker image
RUN npm ci

# Copy the rest of the application code into the Docker image
COPY --chown=node:node . .

# Use the node user from the image
USER node

# Expose port 3000 fsudo systemctl stop apache2or the application
EXPOSE 3000

# Define the command to run the application
CMD [ "node", "dist/main.js" ]