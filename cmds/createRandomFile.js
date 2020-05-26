let emails = require('../data/emails.json');
const fs = require('fs');

const createRandomFileCmd = {
    command: 'randomize',
    desc: 'Randomize an email list',
    builder(yargs) {
        yargs
        .alias('n', "number")
        .nargs('n', 1)
        .describe('n', 'Number of emails')
        .demandOption(['n'])
    },
    async handler({ number }) {        
        let randomEmails = [];
        let emails_remaining = emails.length;
        
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        
        for(let i=0; i<number; i++) {
            index = getRandomInt(0, emails_remaining--);
            randomEmails.push(emails[index]);
            emails.splice(index, 1);    
        }
        
        const filename = `randEmails${number}`;
        fs.writeFileSync(`${filename}.json`, JSON.stringify(randomEmails));
        
        return filename;
    }
};

module.exports = createRandomFileCmd;