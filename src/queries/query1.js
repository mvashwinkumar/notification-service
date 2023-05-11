const QueryConfig = require('../queryConfig');
const LogStrategy = require('../strategies/LogStrategy');
const EmailStrategy = require('../strategies/EmailStrategy');
const InsertCollectionStrategy = require('../strategies/InsertCollectionStrategy');
const WebhookStrategy = require('../strategies/WebhookStrategy');

const emailStrategy = new EmailStrategy({
  emailTemplateName: 'myEmail',
  emailSubject: 'Testing email strategy',
  shouldSendEmail: (results) => results.length > 0,
  userEmails: ['']
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
    {
      $count: 'total',
    }
  ],
  executionType: 'cron', // 'watch' or 'cron' or 'once'
  targetCollection: 'dataInfo',
  cronSchedule: '* * * * *', // Execute every hour
  strategies: [new LogStrategy(), emailStrategy], // Add more strategies here
});

module.exports = query1;