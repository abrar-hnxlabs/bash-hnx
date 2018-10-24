#! /bin/bash

sudo service haproxy stop
sudo letsencrypt renew --standalone
sudo cat /etc/letsencrypt/live/plex.hnxlabs.com/fullchain.pem /etc/letsencrypt/live/plex.hnxlabs.com/privkey.pem | sudo tee /etc/ssl/private/plex.hnxlabs.com.pem 
sudo cat /etc/letsencrypt/live/bt.hnxlabs.com/fullchain.pem /etc/letsencrypt/live/bt.hnxlabs.com/privkey.pem | sudo tee /etc/ssl/private/bt.hnxlabs.com.pem
sudo service haproxy start
