const util = require('util');
const path = require('path');
const exec = util.promisify(require('child_process').exec);

const dockerRestart = async () => {
    const dockerfile = path.resolve(__dirname, '..', '..', 'docker', 'docker-compose.yml');
    log.info(`docker: restarting for -> ${dockerfile}`);
    try {
        log.info(`docker: pulling latest plex container.`);
        await exec(`docker-compose -f ${dockerfile} pull plex`);
        log.info(`docker: pulled latest plex container.`);
        await exec(`docker-compose -f ${dockerfile} down`);
        await exec(`docker-compose -f ${dockerfile} up -d`);
    } catch (e) {
        log.error('Error while restarting docker.',e)
    }
    log.info(`docker: done restart`)
}

module.exports = { dockerRestart }