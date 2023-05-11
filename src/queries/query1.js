const QueryConfig = require('../queryConfig');
const EmailStrategy = require('../strategies/EmailStrategy');
const InsertCollectionStrategy = require('../strategies/InsertCollectionStrategy');
const WebhookStrategy = require('../strategies/WebhookStrategy');

const emailStrategy = new EmailStrategy({
  emailTemplateName: 'myEmail',
  shouldSendEmail: (results) => results.length > 0,
  sendUserListPipeline: [
    // ...
  ],
});

// const insertCollectionStrategy = new InsertCollectionStrategy({
//   targetCollection: 'newRecords',
//   processResults: (results) => results, // Implement your data transformation here
// });

const webhookStrategy = new WebhookStrategy({
  webhookURL: 'https://example.com/webhook',
  webhookTransformer: (results) => results, // Implement your data transformation here
});

const query1 = new QueryConfig({
  name: 'query1',
  pipeline: [
    // ...
  ],
  executionType: 'cron', // 'watch' or 'cron' or 'once'
  targetCollection: 'collection-name',
  cronSchedule: '* * * * *', // Execute every hour
  strategies: [emailStrategy, webhookStrategy], // Add more strategies here
});

module.exports = query1;