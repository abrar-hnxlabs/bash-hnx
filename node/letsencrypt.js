const util  = require('util');
const fs = require('fs');
const { send } = require('./mail-core');
const exec = util.promisify(require('child_process').exec);
const domains = ['plex.hnxlabs.com', 'bt.hnxlabs.com'];

const do_renew = async () => {
    try {
    await exec('systemctl stop haproxy.service', { uid: 0});
    await exec('letsencrypt renew --standalone', { uid: 0});
    domains.forEach((domain) => {
        const fullchain = fs.readFileSync(`/etc/letsencrypt/live/${domain}/fullchain.pem`);
        const privKey = fs.readFileSync(`/etc/letsencrypt/live/${domain}/privkey.pem`);
        fs.writeFileSync(`/etc/ssl/private/${domain}.pem`, `${fullchain}${privKey}`);
    });
    await exec('systemctl start haproxy.service', { uid: 0});
    console.log(stdout);
    } catch(exception){
        console.log('error while executing commands');
        console.log(exception);
    }
}

do_renew();
