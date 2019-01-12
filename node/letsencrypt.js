const util  = require('util');
const { send } = require('./mail-core');
const exec = util.promisify(require('child_process').exec);

const do_renew = async () => {
    const { stdout } = await exec('systemctl stop haproxy.service', { uid: 0});
    console.log(stdout);
}

do_renew();
