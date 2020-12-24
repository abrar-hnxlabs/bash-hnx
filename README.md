# Encryption

## HAProxy
```
mkpasswd -m sha-512 password
```
_mkpasswd is part of whois tool_

## OpenSSL
### Encryption
**the openssl tool will ask for a password during encryption, this same password must be used during decryption.**
```
openssl enc -aes256 -base64 -in filename.decrypted -out filename.encrypted
```
### Decryption
```
openssl enc -d -aes256 -base64 -in filename.encyrpted -out filename.decrypted
```
_filenames are for illustration purpose, they can have any extension_

## Crontab settings
[Crontab Guru](https://crontab.guru/) is a good site to generate cron times
```
0 1 * * 1 /home/abrar/ubuntu-configs/renew-certs.sh > /var/log/innercron.log
15 1 * * 1 /home/abrar/ubuntu-configs/upgrade-plex.sh >> /var/log/innercron.log
0 0 * * * chown -R abrar:plex /home/abrar/media
0 */3 * * * /home/abrar/ubuntu-configs/dyn-dns.sh > /var/log/dyn-dns.log
```

## Rsync
```
sudo mount -t ntfs /dev/sdb1 /mnt
cd /mnt
rsync -av --progress ~/media . # this will create a sync copy with media folder included so just append a . at the end

use -n for dry run
```

## Initialize new HDD
```
sudo fdisk -l # to list the disks
sudo fdisk /dev/sda # select a disk

# within fdisk prompt
g # for new gpt partition table
w # write and exit

# format the new partition

sudo fdisk -l // to get the device path for new parition

sudo mkfs -t ext4 /dev/sda1
```

## Fstab - Auto mount external hdd on boot
Get the UUID of the disk to mount , run the below command
```
sudo blkid
```

Edit the fstab
```
UUID=uuidfromblkid  /mnt/hdd ntfs defaults,nofail 0 0
```


## fail2ban

Install 
```
sudo apt-get install fail2ban
```

Config Dir
```
/etc/fail2ban/jail.d/defaults-debian.con
```
Config
```
[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
ignoreip = 192.168.0.0/24
```

Unban ip's
```
sudo fail2ban-client set sshd unbanip IP_ADDRESS
```

## Screen
Detach
```
ctrl+a , then d
```

List
```
screen -ls
```

re-attach
```
screen -r # attaches to already existing screen command or creates a new one.
```
