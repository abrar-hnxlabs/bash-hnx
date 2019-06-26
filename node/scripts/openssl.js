const util = require('util');
const path = require('path');
const exec = util.promisify(require('child_process').exec);

const encrypt = async (filename) => {
    log.info(`openssl: starting encryption ${filename}`)
    const outFile = path.parse(filename);
    await exec(`openssl enc -aes256 -base64 -in ${filename} -out ${outFile.name}.enc`);
    log.info(`openssl: done encryption ${filename}`)
}

const decrypt = async (filename) => {
    log.info(`openssl: starting decryption ${filename}`)
    const outFile = path.parse(filename);
    await exec(`openssl enc -d -aes256 -base64 -in ${filename} -out ${outFile.name}.env`);
    log.info(`openssl: done decryption ${filename}`)
}

module.exports = { encrypt, decrypt }