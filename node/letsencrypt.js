const util  = require('util');
const { send } = require('./mail-core');
const exec = util.promisify(require('child_process').exec);

const do_renew = async () => {
    await exec('service haproxy stop', { uid: 0});
}
