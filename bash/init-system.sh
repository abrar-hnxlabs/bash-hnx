#! /bin/bash

if [ "$(whoami)" != "root" ]; then
	echo "Must run script as root to execute"
	exit 1
fi

echo "Confirm you want to start system init? Y/N"
read answer
if [ "$answer" == "Y" ] || [ "$answer" == "y" ]; then
  sudo apt-get update
  sudo apt-get install -y \
  	        samba \
			      whois
  curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
  sudo apt-get install -y nodejs
  
  ln -s /home/abrar/myubuntu/node/bin/app /bin/myapp
  myapp --update_dns
  myapp --apply_config
fi
