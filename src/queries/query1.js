const QueryConfig = require('../queryConfig');
const EmailStrategy = require('../strategies/EmailStrategy');
const InsertCollectionStrategy = require('../strategies/InsertCollectionStrategy');
const WebhookStrategy = require('../strategies/WebhookStrategy');

const emailStrategy = new EmailStrategy({
  emailTemplate: 'sampleTemplate',
  shouldSendEmail: (results) => results.length > 0,
  sendUserListPipeline: [
    // ...
  ],
});

const insertCollectionStrategy = new InsertCollectionStrategy({
  targetCollection: 'newRecords',
  processResults: (results) => results, // Implement your data transformation here
});

const webhookStrategy = new WebhookStrategy({
  webhookURL: 'https://example.com/webhook',
  webhookTransformer: (results) => results, // Implement your data transformation here
});

const query1 = new QueryConfig({
  name: 'query1',
  pipeline: [
    // ...
  ],
  executionType: 'watch', // or 'cron' or 'once'
  targetCollection: 'collection-name',
  cronSchedule: '0 * * * *', // Execute every hour
  strategies: [emailStrategy, insertCollectionStrategy, webhookStrategy], // Add more strategies here
});

module.exports = query1;