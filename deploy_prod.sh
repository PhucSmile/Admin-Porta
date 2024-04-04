#!/bin/sh
project_dir=/home/webportal-project/frontend
server=root@103.15.51.162

rsync -ravz --delete build public $server:$project_dir
rsync -avz server.js package.json ecosystem.config.json $server:$project_dir
ssh -t $server 'cd '$project_dir' && yarn install && pm2 startOrRestart ecosystem.config.json --env production'
