const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: '',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: '', // your email address
        pass: '' // your email password or access token
    }
});

async function renderTemplate(templateName, data) {
  const templatePath = path.join(__dirname, '..', 'emailTemplates', `${templateName}.hbs`);
  const templateContent = await fs.promises.readFile(templatePath, 'utf-8');
  const template = handlebars.compile(templateContent);
  return template(data);
}

async function sendEmails(userEmails, subject, templateName, data) {
    const template = await renderTemplate(templateName, data);

    await transporter.verify();
    await transporter.sendMail({
        from: '',
        to: userEmails,
        subject,
        html: template,
    });
}

module.exports = {
    sendEmails,
};
