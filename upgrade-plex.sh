#! /bin/bash
echo "plex: downloading"
curl -sL -o ./plex.deb "https://plex.tv/downloads/latest/1?channel=16&build=linux-ubuntu-x86_64&distro=ubuntu&X-Plex-Token=4Jnu8SqixsEwiJFWK9D4"
echo "plex: installing"
sudo dpkg -i ./plex.deb
echo "plex: install result $?"
echo "plex: cleanup"
rm ./plex.deb
