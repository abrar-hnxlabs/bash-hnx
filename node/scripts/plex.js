const util = require('util');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const { send } = require(path.resolve(__dirname,'core','mail.js'));
const exec = util.promisify(require('child_process').exec);

const downloadUrl = 'https://plex.tv/downloads/latest/1?channel=16&build=linux-ubuntu-x86_64&distro=ubuntu&X-Plex-Token=4Jnu8SqixsEwiJFWK9D4';
const tmpFileBin ='/tmp/plex.deb';
const download_package = async () => {
    const response = await axios({
        method: 'get',
        responseType: 'arraybuffer',
        url: downloadUrl
    });
    fs.writeFileSync(tmpFileBin, response.data);
}

const cleanup = () => {
    fs.unlinkSync(tmpFileBin);
}
const upgradeplex = async () => {
    try {
        await download_package();
        await exec(`dpkg -i ${tmpFileBin}`, { uid: 0, env: { PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'} });
        if(process.env.SEND_PLEX_MAIL === 'true' ){
            send('Plex upgrade: Success', 'Attempted plex upgrade.');
        }
    } catch (exception) {
        if(process.env.SEND_PLEX_MAIL === 'true' ){
            send('Plex upgrade: Failed', 'Attempted plex upgrade was failure <br />' + JSON.stringify(exception));
        }
        console.log(exception);
    } finally {
        cleanup();
    }
}

module.exports = { upgradeplex };