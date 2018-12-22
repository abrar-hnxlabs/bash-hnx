#! /bin/bash

rootDir="/home/abrar/ubuntu-configs"
if [ ! -r "$rootDir/auth1.dec" ]; then
	echo "Decrypting first secret, password hint: qQ7"
	openssl enc -d -aes256 -base64 -in "$rootDir/auth1.enc" -out "$rootDir/auth1.dec"
fi

if [ ! -r "$rootDir/auth2.dec" ]; then
	echo "Decrypting second secret, password hint: qQ7"
	openssl enc -d -aes256 -base64 -in "$rootDir/auth2.enc" -out "$rootDir/auth2.dec"
fi

auth1=$(cat "$rootDir/auth1.dec")
auth2=$(cat "$rootDir/auth2.dec")
date
echo " "
curl -XPOST -H "Authorization: Basic $auth1" 'https://domains.google.com/nic/update?hostname=bt.hnxlabs.com'
echo " "
curl -XPOST -H "Authorization: Basic $auth2" 'https://domains.google.com/nic/update?hostname=plex.hnxlabs.com'
echo " "
