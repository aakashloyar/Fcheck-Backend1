#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.5.0/bin

cd dist
 git pull origin main
 cd server
 pm2 kill
 pm2 start index.js