const path = require('path');
const { execSync } = require('child_process');

const execEncode = async (inputfilePath) => {
    inputfilePath = path.normalize(inputfilePath);
    const baseDir = path.dirname(inputfilePath);
    const ext = path.extname(inputfilePath);
    const fileName = path.basename(inputfilePath, ext);
    
    const output = `${baseDir}/${fileName}-transcode.mkv`;
    try {
        const args = [
            '/usr/bin/HandBrakeCLI',
            '-f av_mkv',
            '-e x265_10bit',
            `-i '${inputfilePath}'`,
            `-o '${output}'`
        ]
        await execSync( args.join(' '), { stdio: 'inherit' });
    } catch (e){
        console.log('Error while exec handbrake', e);
    }
}

module.exports = { execEncode };