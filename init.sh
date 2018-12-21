#! /bin/sh

cp -v smb.simple.conf /etc/samba/smb.conf
cp -v haproxy.cfg /etc/haproxy/haproxy.cfg
cp -v transmission-setting.json /etc/transmission-daemon/settings.json
systemctl reload transmission-daemon.service
systemctl restart haproxy
systemctl restart smbd

echo "Setting up the groups"
usermod -a -G plex debian-transmission
usermod -a -G plex abrar
