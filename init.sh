#! /bin/bash

if [ "$(whoami)" != "root" ]; then
	echo "Must run script as root to execute"
	exit 1
fi

./dyn-dns.sh

letsencrypt certonly --standalone -d bt.hnxlabs.com,plex.hnxlabs.com 

cp -v smb.simple.conf /etc/samba/smb.conf
cp -v haproxy.cfg /etc/haproxy/haproxy.cfg
cp -v transmission-setting.json /etc/transmission-daemon/settings.json
systemctl reload transmission-daemon.service
systemctl restart haproxy
systemctl restart smbd

echo "adding users to plex group"

if [[ "$(groups abrar)" =~ .*plex.* ]]; then
	echo "User Already has plex group"
else
	usermod -a -G plex abrar
fi

if [[ "$(groups debian-transmission)" =~ .*plex.* ]]; then
	echo "User Already has plex group"
else
	usermod -a -G plex debian-transmission
fi

echo "Setting file permissions"
chown -R abrar:plex /home/abrar/media
chmod -R 775 /home/abrar/media
