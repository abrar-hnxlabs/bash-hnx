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
        		software-properties-common \
		        samba \
			      whois
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo apt-key fingerprint 0EBFCD88
  sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) \
    stable"
  sudo apt-get update
  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose
  curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
  sudo apt-get install -y nodejs
  
  ln -s /home/abrar/myubuntu/node/bin/app /bin/myapp
  myapp --update_dns
  myapp --apply_config
fi
