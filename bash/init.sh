#! /bin/bash

if [ "$(whoami)" != "root" ]; then
	echo "Must run script as root to execute"
	exit 1
fi

ln -s /home/abrar/ubuntu-configs/node/bin/app /bin/myapp
myapp --update_dns
myapp --install_certs
myapp --apply_config
echo "adding users to plex group"

if [[ "$(groups abrar)" =~ .*plex.* ]]; then
	echo "User Already has plex group"
else
	usermod -a -G plex abrar
	usermod -a -G debian-transmission abrar
fi

if [[ "$(groups debian-transmission)" =~ .*plex.* ]]; then
	echo "User Already has plex group"
else
	usermod -a -G plex debian-transmission
fi

echo "Setting file permissions"
chown -R abrar:plex /home/abrar/media
chmod -R 775 /home/abrar/media
