const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
module.exports = {
    printLogs: async () => {
        const logPath = path.resolve(__dirname, '..', 'bin', 'app.log');
        const logs = await readFile(logPath);
        console.log(logs);
    }
}