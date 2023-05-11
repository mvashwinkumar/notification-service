const NotificationStrategy = require('./NotificationStrategy');
const emailService = require('../services/emailService');
const mongoService = require('../services/mongoService');

class EmailStrategy extends NotificationStrategy {
  constructor({ emailTemplate, shouldSendEmail }) {
    super();
    this.emailTemplate = emailTemplate;
    this.shouldSendEmail = shouldSendEmail;
  }

  async execute(results) {
    if (this.shouldSendEmail(results)) {
      const userEmails = await mongoService.getUserEmails();
      await emailService.sendEmails(userEmails, this.emailTemplate, results);
    }
  }
}

module.exports = EmailStrategy;