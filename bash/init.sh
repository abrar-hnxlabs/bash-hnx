#! /bin/bash

if [ "$(whoami)" != "root" ]; then
	echo "Must run script as root to execute"
	exit 1
fi

ln -s /home/abrar/ubuntu-configs/node/bin/app /bin/myapp
myapp --update_dns
myapp --apply_config
echo "Setting file permissions"
chmod -R 775 /home/abrar/media
