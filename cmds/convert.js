const convertCmd = {
    command: 'convert',
    desc: 'convert randomized json file to another type',
    builder(yargs) {
        yargs
            .alias('t', 'type')
            .describe('t', 'type desired to convert the file (ex.: txt)')
            .nargs('t', 1)
            .default('t', 'txt')
            .alias('f', 'filename')            
            .describe('f', 'json filename to be converted')
            .nargs('f', 1)
            .demandOption(['f'])
    },

    handler({ type, filename }) {
        const logger = require('../util/logger');
        logger.info({name: 'convert', msg: 'Start convert command'});
        const fs = require('fs');
        const os = require('os');
        const [filenameWithoutType] = filename.split('.');        
        const randEmails = require(`../${filename}`);                        

        randEmails.forEach((email, index) => {
            fs.appendFileSync(`${process.cwd()}/out/${filenameWithoutType}.${type}`, `${email.value}${os.EOL}`);
            logger.debug({name: 'convert', msg: `index ${index}` });
        });

        logger.info({name: 'convert', msg: 'End convert command'});
    }
};

module.exports = convertCmd;