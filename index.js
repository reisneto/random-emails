#!/usr/bin/env node
const argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command("randomize", "Randomize an email list")
  .example("$0 randomize -n emails.json",
    "Randomize N emails from the file")
  .alias('n', "number")
  .nargs('n', 1)
  .describe('n', 'Number of emails')
  .demandOption(['n'])
  .help('h')
  .alias('h', 'help').argv


async function createRandomFile(number_of_emails = 1) {
  let emails = require('./emails.json');
  const fs = require('fs');

  let randomEmails = [];
  let emails_remaining = emails.length;

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  for(let i=0; i<number_of_emails; i++) {
    index = getRandomInt(0, emails_remaining--);
    randomEmails.push(emails[index]);
    emails.splice(index, 1);    
  }

  const filename = `randEmails${number_of_emails}`;
  fs.writeFileSync(`${filename}.json`, JSON.stringify(randomEmails));

  return filename;
}

function convertToTxt(filename) {
  const fs = require('fs');
  const os = require('os');

  const randEmails = require(`./${filename}`);
  console.log(randEmails.length);
  randEmails.forEach((email, index) => {
    fs.appendFileSync(`${filename}.txt`, `${email.value}${os.EOL}`);
    console.log(index);  
  });
}
async function main () {
  const number_of_emails = argv.number;
  console.log(number_of_emails);
  filename = await createRandomFile(number_of_emails)
  convertToTxt(filename)
}

main()