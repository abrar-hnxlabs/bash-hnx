#! /bin/bash

if [ "$(whoami)" != "root" ]; then
	echo "Must run script as root to execute"
	exit 1
fi

node ../node/index.js --update_dns
node ../node/index.js --install_certs
node ../node/index.js --apply_config
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
