const sgMail = require('@sendgrid/mail');
const to = process.env.SENDTO_EMAIL;
const sendGridApiKey = process.env.SENDGRID_API_KEY;

module.exports = { 
    send : async (subject, html) => {
        sgMail.setApiKey(sendGridApiKey);
        const msg = {
        to,
        from: 'cron@example.com',
        subject,
        html
        };
        await sgMail.send(msg);
    }
}