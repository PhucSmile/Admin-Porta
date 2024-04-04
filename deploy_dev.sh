#!/bin/sh
project_dir=/home/vudai-webportal/frontend
server=root@157.230.40.21

rsync -ravz --delete build public $server:$project_dir
rsync -avz server.js package.json ecosystem.config.json $server:$project_dir
ssh -t $server 'cd '$project_dir' && yarn install && pm2 startOrRestart ecosystem.config.json --env staging'
