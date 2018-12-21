#! /bin/bash

if [ "$(whoami)" != "root" ]; then
	echo "Must run script as root to execute"
	exit 1
fi

echo "starting ddclient config, get the credentials from google domains"
echo "provide username for bt.hnxlabs.com"
read btusername
echo "provide password for bt.hnxlabs.com"
read btpassword
echo "use=web, web=ipconfig.io\nprotocol=googledomains,\nlogin=$btusername,\npassword=$btpassword\nbt.hnxlabs.com" > /etc/ddclient.conf

echo "provide username for plex.hnxlabs.com"
read plexusername
echo "provide password for plex.hnxlabs.com"
read plexpassword
echo "\nuse=web, web=ipconfig.io\nprotocol=googledomains,\nlogin=$plexusername,\npassword=$plexpassword\nbt.hnxlabs.com" >> /etc/ddclient.conf

systemctl restart ddclient

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
