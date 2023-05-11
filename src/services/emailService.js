const path = require('path');
const nodemailer = require('nodemailer');

const { email } = require('../config');

const transporter = nodemailer.createTransport({
    host: email.host,
    port: email.port,
    secure: email.secure, // true for 465, false for other ports
    auth: {
        user: email.user, // your email address
        pass: email.pass // your email password or access token
    }
});

async function sendEmails(userEmails, subject, templateFn, data) {
    await transporter.verify();
    await transporter.sendMail({
        from: email.from,
        to: userEmails,
        subject,
        html: templateFn({ data }),
    });
}

module.exports = {
    sendEmails,
};
