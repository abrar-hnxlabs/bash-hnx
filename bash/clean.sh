#! /bin/bash

packages=`apt list --installed | awk -F '/' '{ print $1 }'`
for pack in $packages
do
	printf "Uninstall $pack ? y/n/q: \n"
	read -n 1 inputval
	if [ $inputval == "Y" ] || [ $inputval == "y" ]
	then
		sudo apt-get purge --auto-remove -y $pack
	elif [ $inputval == "Q" ] || [ $inputval == "q" ]
	then
		printf "Quitting\n"
		break
	fi
done
