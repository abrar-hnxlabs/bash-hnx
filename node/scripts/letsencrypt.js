const util = require('util');
const path = require('path');
const fs = require('fs');
const { send } = require(path.resolve(__dirname,'core','mail.js'));
const exec = util.promisify(require('child_process').exec);
const domains = ['plex.hnxlabs.com', 'bt.hnxlabs.com', 'pihole.hnxlabs.com'];
    
const do_renew = async () => {
    try {
        await haproxy(false);
        await letsencrypt(true);
        install_certs();
        await haproxy(true);
        if (process.env.SEND_CERTS_MAIL === 'true'){
            await send('Letsencrypt cron', 'Attempted to renew certs success');
        }
    } catch(exception){
        if (process.env.SEND_CERTS_MAIL === 'true'){
            await send('Letsencrypt cron', 'Attempted to renew certs had error,<br />'+JSON.stringify(exception));
        }
        console.log(exception);
    }
}

const do_init = async () => {
    try {
        await haproxy(false);
        await letsencrypt(false);
        install_certs();
        await haproxy(true);
    } catch(exception){
        console.log(exception);
    }
}

const install_certs = () => {
    domains.forEach((domain) => {
        const fullchain = fs.readFileSync(`/etc/letsencrypt/live/${domain}/fullchain.pem`);
        const privKey = fs.readFileSync(`/etc/letsencrypt/live/${domain}/privkey.pem`);
        fs.writeFileSync(`/etc/ssl/private/${domain}.pem`, `${fullchain}${privKey}`);
    });
}

const haproxy = async (start) => {
    if(start) {
        await exec('systemctl start haproxy.service', { uid: 0});
    } else {
        await exec('systemctl stop haproxy.service', { uid: 0});
    }
}

const letsencrypt = async (renew) => {
    if(renew){
        await exec('letsencrypt renew --standalone', { uid: 0});
    } else {
        await exec(`letsencrypt certonly --standalone -d ${domains.join(',')}`, { uid: 0});
    }
}

module.exports = { do_init, do_renew };