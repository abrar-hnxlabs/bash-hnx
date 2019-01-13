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
		        samba \
			whois
  curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
  sudo apt-get install -y nodejs
  sudo ./init.sh
fi
