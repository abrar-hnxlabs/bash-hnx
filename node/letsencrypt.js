require('dotenv').config();
const program = require('commander');
const util  = require('util');
const fs = require('fs');
const { send } = require('./mail-core');
const exec = util.promisify(require('child_process').exec);
const domains = ['plex.hnxlabs.com', 'bt.hnxlabs.com'];

program
    .version('1.0.0')
    .option('-i --install', 'do intall')
    .option('-r --renew', 'do renew')
    .parse(process.argv);
    
const do_renew = async () => {
    try {
        systemctl(false);
        letsencrypt(true);
        install_certs();
        systemctl(true);
        if (process.env.SEND_CERTS_MAIL === 'true'){
            await send('Letsencrypt cron', 'Attempted to update certs');
        }
    } catch(exception){
        console.log(exception);
    }
}

const do_init = async () => {
    try {
        systemctl(false);
        letsencrypt(false);
        install_certs();
        systemctl(true);
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

const systemctl = async (start) => {
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

if(program.install) {
    do_init();
} else if (program.renew) {
    do_renew();
} else {
    console.log('no command provided');
}