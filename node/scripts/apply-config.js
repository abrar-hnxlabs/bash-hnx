const util = require('util');
const path = require('path');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);

const copyConfigFiles = () => {
    console.log('start copying');
    fs.copyFileSync(path.resolve(__dirname, '..', '..', 'confs', 'smb.simple.conf'), path.resolve('/etc/samba/smb.conf'));
    console.log('copy complete');
}

const reloadServices = async () => {
    console.log('starting reloads');
    await exec('systemctl restart smbd.service', { uid: 0 });
    console.log('done reloads');
}

const doCopy = async () => {
    copyConfigFiles();
    await reloadServices();
}
module.exports = { doCopy };