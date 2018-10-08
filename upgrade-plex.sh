#! /bin/bash

curl -L -o plex.deb "https://plex.tv/downloads/latest/1?channel=16&build=linux-ubuntu-x86_64&distro=ubuntu&X-Plex-Token=4Jnu8SqixsEwiJFWK9D4"
sudo dpkg -i plex.deb
rm -i plex.deb
