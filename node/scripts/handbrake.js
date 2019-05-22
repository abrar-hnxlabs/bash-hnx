const util = require('util');
const path = require('path');
const exec = util.promisify(require('child_process').execFile);
const { execFileSync } = require('child_process');

const execEncode = async (inputfilePath) => {
    const baseDir = path.dirname(inputfilePath);
    const output = `${baseDir}/output-transcode-h265.mkv`;
    try {
        //const handbrake = spawn('/usr/bin/HandBrakeCLI', [`-f av_mkv -e x265_10bit -E eac3 -i '${inputfilePath}' -o '${output}'`], { stdio: 'inherit'});
        const args = [
            '-f av_mkv',
            '-e x265_10bit',
            `-i '${inputfilePath}'`,
            `-o '${output}'`
        ]
        await execFileSync('/usr/bin/HandBrakeCLI', args, { stdio: 'inherit' });
    } catch (e){
        console.log('Error while exec handbrake', e);
    }
}

module.exports = { execEncode };