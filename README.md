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


