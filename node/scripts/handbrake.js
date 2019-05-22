const util = require('util');
const path = require('path');
const exec = util.promisify(require('child_process').execFileSync);
// const { spawn } = require('child_process');

const execEncode = async (inputfilePath) => {
    const baseDir = path.dirname(inputfilePath);
    const output = `${baseDir}/output-transcode-h265.mkv`;
    try {
        //const handbrake = spawn('/usr/bin/HandBrakeCLI', [`-f av_mkv -e x265_10bit -E eac3 -i '${inputfilePath}' -o '${output}'`], { stdio: 'inherit'});
        await exec('/usr/bin/HandBrakeCLI', [`-f av_mkv -e x265_10bit -E eac3 -i "${inputfilePath}" -o "${output}"`] );
    } catch (e){
        console.log('Error while exec handbrake', e.code);
    }
}

module.exports = { execEncode };