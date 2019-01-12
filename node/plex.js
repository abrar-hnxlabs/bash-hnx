const util = require('util');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const { send } = require(path.resolve(__dirname, 'mail-core.js'));
const exec = util.promisify(require('child_process').exec);

const downloadUrl = 'https://plex.tv/downloads/latest/1?channel=16&build=linux-ubuntu-x86_64&distro=ubuntu&X-Plex-Token=4Jnu8SqixsEwiJFWK9D4';
const download_package = async () => {
    const response = await axios.get(downloadUrl);
    fs.writeFileSync('plex.deb', response.data);
}

const upgradeplex = () => {
    try {
        await exec(`dpkg -i ${path.resolve(__dirname, 'plex.deb')}`, { uid: 0 });
        if(process.env.SEND_PLEX_MAIL === 'true' ){
            send('Plex upgrade', 'Attempted plex upgrade.');
        }
    } catch (exception) {
        if(process.env.SEND_PLEX_MAIL === 'true' ){
            send('Plex upgrade', 'Attempted plex upgrade was failure <br />' + JSON.stringify(exception));
        }
        console.log(exception);
    }
}

module.exports = { upgradeplex };