#! /bin/bash

sudo apt-get update
sudo add-apt-repository ppa:transmissionbt/ppa
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get install -y certbot\
       		transmission-cli \
	       	transmission-common \
	       	transmission-daemon \
		haproxy \
		ddclient \
		software-properties-common \
		samba

sudo ./upgrade-plex.sh
sudo ./init.sh
