#! /bin/bash

if [ "$(whoami)" != "root" ]; then
	echo "Must run script as root to execute"
	exit 1
fi

ln -s /home/abrar/ubuntu-configs/node/bin/app /bin/myapp
myapp --update_dns
myapp --apply_config
echo "adding users to plex group"

if [[ "$(groups abrar)" =~ .*plex.* ]]; then
	echo "User Already has plex group"
else
	usermod -a -G plex abrar
fi

echo "Setting file permissions"
chown -R abrar:plex /home/abrar/media
chmod -R 775 /home/abrar/media
