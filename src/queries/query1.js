const QueryConfig = require('../queryConfig');
const LogStrategy = require('../strategies/LogStrategy');
const EmailStrategy = require('../strategies/EmailStrategy');
const InsertCollectionStrategy = require('../strategies/InsertCollectionStrategy');
const WebhookStrategy = require('../strategies/WebhookStrategy');

module.exports = new QueryConfig({
  name: 'query1',
  enabled: true,
  targetCollection: 'dataInfo',
  executionType: 'cron', // 'watch' or 'cron' or 'once'
  cronSchedule: '* * * * *', // Execute every minute
  pipeline: [
    {
      $count: 'total',
    }
  ],
  strategies: [
    new LogStrategy(),
    new EmailStrategy({
      emailTemplateName: 'myEmail',
      emailSubject: 'Testing email strategy',
      shouldSendEmail: (results) => results.length > 0,
      userEmails: ['']
    }),
    new InsertCollectionStrategy({
      targetCollection: 'newRecords',
      processResults: (results) => results, // Implement your data transformation here
    }),
    new WebhookStrategy({
      webhookURL: 'https://example.com/webhook',
      webhookTransformer: (results) => results, // Implement your data transformation here
    })
  ],
});
