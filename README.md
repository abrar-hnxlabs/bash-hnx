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

