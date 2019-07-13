#! /bin/bash

docker run -p "80:80" \
    -v "/home/abrar/docker/letsencrypt:/config" \
    -e "PUID=1000" \
    -e "PGID=1001" \
    -e "TZ=America/Los_angeles" \
    -e "URL=hnxlabs.com" \
    -e "SUBDOMAINS=plex,bt" \
    -e "VALIDATION:=http" \
    -e "STAGING=false" \
    -e "ONLY_SUBDOMAINS=true" \
    linuxserver/letsencrypt