#! /bin/bash

packages=`apt list --installed | awk -F '/' '{ print $1 }'`

if [ "$1" == "-l" ]
then
	for pack in $packages
	do 
		printf "$pack\n"
	done
	exit 0
fi

for pack in $packages
do
	printf "Uninstall $pack ? y/n/q:"
	read -n 1 inputval
	printf "\n"
	if [ $inputval == "Y" ] || [ $inputval == "y" ]
	then
		sudo apt-get purge --auto-remove -y $pack
	elif [ $inputval == "Q" ] || [ $inputval == "q" ]
	then
		printf "Quitting\n"
		exit 0
	fi
done
