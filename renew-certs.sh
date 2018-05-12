#! /bin/bash

service haproxy stop
letsencrypt renew --standalone
cat /etc/letsencrypt/live/plex.hnxlabs.com/fullchain.pem /etc/letsencrypt/live/plex.hnxlabs.com/privkey.pem > /etc/ssl/private/plex.hnxlabs.com.pem 
cat /etc/letsencrypt/live/bt.hnxlabs.com/fullchain.pem /etc/letsencrypt/live/bt.hnxlabs.com/privkey.pem > /etc/ssl/private/bt.hnxlabs.com.pem
service haproxy start