function createRandomFile() {
  let emails = require('./emails.json');
  const fs = require('fs');

  let randomEmails = [];
  let emails_remaining = emails.length;
  const NUM_OF_EMAILS = 9;

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  for(let i=0; i<NUM_OF_EMAILS; i++) {
    index = getRandomInt(0, emails_remaining--);
    randomEmails.push(emails[index]);
    emails.splice(index, 1);    
  }

  fs.writeFileSync(`randEmails${10}.json`, JSON.stringify(randomEmails));
}

function convertListtoTxt() {
  const fs = require('fs');
  const os = require('os');

  const randEmails = require('./randEmails10.json');
  console.log(randEmails.length);
  randEmails.forEach((email, index) => {
    fs.appendFileSync(`randEmails${10}.txt`, `${email.value}${os.EOL}`);
    console.log(index);  
  });
}

createRandomFile()
convertListtoTxt()