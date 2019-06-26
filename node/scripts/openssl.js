const util = require('util');
const path = require('path');
const exec = util.promisify(require('child_process').exec);

const encrypt = async (filename) => {
    const outFile = path.parse(filename);
    await exec(`openssl enc -aes256 -base64 -in ${filename} -out ${outFile.name}.enc`);
}

const decrypt = async (filename) => {
    const outFile = path.parse(filename);
    await exec(`openssl enc -d -aes256 -base64 -in ${filename} -out ${outFile.name}.env`);
}

module.exports = { encrypt, decrypt }