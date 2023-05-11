const axios = require('axios');

const NotificationStrategy = require('./NotificationStrategy');

class WebhookStrategy extends NotificationStrategy {
  constructor({ webhookURL, webhookTransformer }) {
    super();
    this.webhookURL = webhookURL;
    this.webhookTransformer = webhookTransformer;
  }

  async execute(results) {
    const transformedResults = this.webhookTransformer ? this.webhookTransformer(results) : results;
    await axios.post(this.webhookURL, transformedResults);
  }
}

module.exports = WebhookStrategy;