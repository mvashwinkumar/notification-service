const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const NotificationStrategy = require('./NotificationStrategy');
const emailService = require('../services/emailService');

class EmailStrategy extends NotificationStrategy {
  constructor({ emailTemplateName, emailSubject, userEmails, shouldSendEmail }) {
    super();
    this.shouldSendEmail = shouldSendEmail;
    this.emailSubject = emailSubject;
    this.userEmails = userEmails;
    const templatePath = path.join(__dirname, '..', 'emailTemplates', `${emailTemplateName}.hbs`);
    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    this.emailTemplateFn = handlebars.compile(templateContent);
  }

  async execute(results) {
    if (this.shouldSendEmail(results)) {
      await emailService.sendEmails(this.userEmails, this.emailSubject, this.emailTemplateFn, results);
    }
  }
}

module.exports = EmailStrategy;