#! /bin/bash

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
  curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
  sudo apt-get install -y nodejs
  sudo ./init.sh
fi
