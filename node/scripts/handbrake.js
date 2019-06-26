const path = require('path');
const { execSync } = require('child_process');

const execEncode = (inputfilePath) => {
    log.info(`handbrake: starting file encode, ${inputfilePath}`)
    inputfilePath = path.normalize(inputfilePath);
    const baseFileObj = path.parse(inputfilePath);
    
    const output = `${baseFileObj.dir}/${baseFileObj.name}-transcode.mkv`;
    try {
        const args = [
            '/usr/local/bin/HandBrakeCLI',
            '-f av_mkv',
            '-e x264',
            '-E eac3',
            `-i '${inputfilePath}'`,
            `-o '${output}'`
        ]
        execSync( args.join(' '), { stdio: 'inherit' });
    } catch (e){
        log.error('handbrake: Error while exec handbrake', e);
    }
    log.info('handbrake: file encoding done')
}

module.exports = { execEncode };