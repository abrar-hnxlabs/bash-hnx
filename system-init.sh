#! /bin/bash

echo "Confirm you want to start system init? Y/N"
read answer
if [ "$answer" == "Y" ] || [ "$answer" == "y" ]; then
  sudo apt-get update
  sudo add-apt-repository ppa:transmissionbt/ppa
  sudo add-apt-repository ppa:certbot/certbot
  sudo apt-get install -y certbot\
        		transmission-cli \
         	       	transmission-common \
	         	transmission-daemon \
	        	haproxy \
		        software-properties-common \
		        samba

  sudo ./upgrade-plex.sh
  sudo ./init.sh
fi
