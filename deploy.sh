# #!/bin/bash
# export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.5.0/bin

# cd Fcheck-Backend1
#  git pull origin main
#  cd dist
#  pm2 kill
#  pm2 start index.js



#!/bin/bash

# Set the PATH to include Node.js binary
export PATH="$PATH:/home/ubuntu/.nvm/versions/node/v20.5.0/bin"

# Load NVM if necessary
source /home/ubuntu/.nvm/nvm.sh

# Change directory to the project directory
cd /home/ubuntu/Fcheck-Backend1

# Pull the latest changes from the repository
git pull origin main

# Change directory to the 'dist' directory
cd /home/ubuntu/Fcheck-Backend1/dist

# Kill any existing PM2 processes
pm2 kill

# Start the application using PM2
pm2 start index.js
