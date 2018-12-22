#! /bin/bash

if [ ! -r auth1.dec ]; then
	echo "Decrypting first secret, password hint: qQ7"
	openssl enc -d -aes256 -base64 -in ./auth1.enc -out auth1.dec
fi

if [ ! -r auth2.dec ]; then
	echo "Decrypting second secret, password hint: qQ7"
	openssl enc -d -aes256 -base64 -in ./auth2.enc -out auth2.dec
fi

auth1=$(cat auth1.dec)
auth2=$(cat auth2.dec)
date
echo "\n"
curl -XPOST -H "Authorization: Basic $auth1" 'https://domains.google.com/nic/update?hostname=bt.hnxlabs.com'
echo "\n"
curl -XPOST -H "Authorization: Basic $auth2" 'https://domains.google.com/nic/update?hostname=plex.hnxlabs.com'
