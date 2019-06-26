const util = require('util');
const path = require('path');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);

const copyConfigFiles = () => {
    log.info('apply_config: start copying');
    fs.copyFileSync(path.resolve(__dirname, '..', '..', 'confs', 'smb.simple.conf'), path.resolve('/etc/samba/smb.conf'));
    log.info('apply_config: copy complete');
}

const reloadServices = async () => {
    log.info('apply_config: starting reloads');
    await exec('systemctl restart smbd.service', { uid: 0 });
    log.info('apply_config: done reloads');
}

const doCopy = async () => {
    copyConfigFiles();
    await reloadServices();
}
module.exports = { doCopy };