const path = require('path');
const { execSync } = require('child_process');

const execEncode = (inputfilePath) => {
    inputfilePath = path.normalize(inputfilePath);
    const baseFileObj = path.parse(inputfilePath);
    
    const output = `${baseFileObj.dir}/${baseFileObj.name}-transcode.mkv`;
    try {
        const args = [
            '/usr/bin/HandBrakeCLI',
            '-f av_mkv',
            '-e x265_10bit',
            '-E eac3',
            `-i '${inputfilePath}'`,
            `-o '${output}'`
        ]
        execSync( args.join(' '), { stdio: 'inherit' });
    } catch (e){
        console.log('Error while exec handbrake', e);
    }
}

module.exports = { execEncode };