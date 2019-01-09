require('dotenv').config();
const sgMail = require('@sendgrid/mail');
process.stdin.setEncoding('utf8');

let inputPipe = '';
const sendToEmail = process.env.SENDTO_EMAIL;
const sendGridApiKey = process.env.SENDGRID_API_KEY;

process.stdin.on('readable', () => {
  const input = process.stdin.read();
  if(input){
    inputPipe += input;
  }
});

process.stdin.on('end', async () => {  
  sgMail.setApiKey(sendGridApiKey);
  const msg = {
    to: sendToEmail,
    from: 'cron@example.com',
    subject: 'Cron Email Update',
    text: inputPipe
  };
  try {
    await sgMail.send(msg);
    process.exit(0);
  } catch (exception) {
    process.exit(1);
  }
});

