const util = require('util');
const path = require('path');
const exec = util.promisify(require('child_process').exec);

const execEncode = async (inputfilePath) => {
    const baseDir = path.dirname(inputfilePath);
    const output = `${baseDir}/output-transcode-h265.mkv`;
    try {
        await exec(`HandBrakeCLI -f av_mkv -e x265_10bit -E eac3 -i '${inputfilePath}' -o '${output}'`);
    } catch (e){
        console.log('Error while exec handbrake');
    }
}

module.exports = { execEncode };