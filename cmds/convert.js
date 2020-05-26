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
        const fs = require('fs');
        const os = require('os');
        const [filenameWithoutType] = filename.split('.');

        const randEmails = require(`../${filename}`);
        console.log(randEmails.length);
        randEmails.forEach((email, index) => {
            fs.appendFileSync(`${filenameWithoutType}.${type}`, `${email.value}${os.EOL}`);
            console.log(index);
        });
    }
};

module.exports = convertCmd;