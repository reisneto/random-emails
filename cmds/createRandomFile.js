let emails = require('../data/emails.json');
const fs = require('fs');
const logger = require('../util/logger');

const createRandomFileCmd = {
    command: ['randomize', '$0'],
    desc: 'Randomize an email list',
    builder(yargs) {
        yargs
        .alias('n', "number")
        .nargs('n', 1)
        .describe('n', 'Number of emails')
        .demandOption(['n'])
    },
    async handler({ number }) {  
        logger.info({name: 'randomize', msg: 'Start randomize command'});
        let randomEmails = [];
        let emails_remaining = emails.length;
        
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        logger.info({name: 'randomize', msg: 'Start generate random list'});
        for(let i=0; i<number; i++) {
            index = getRandomInt(0, emails_remaining--);
            randomEmails.push(emails[index]);
            emails.splice(index, 1);    
        }
        logger.info({name: 'randomize', msg: 'End generate random list'});
        
        const filename = `randEmails${number}`;
        fs.writeFileSync(`${filename}.json`, JSON.stringify(randomEmails));
        
        logger.info({name: 'randomize', msg: 'End randomize command'});
        return filename;
    }
};

module.exports = createRandomFileCmd;