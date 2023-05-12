const QueryConfig = require('../queryConfig');
const LogStrategy = require('../strategies/LogStrategy');
const EmailStrategy = require('../strategies/EmailStrategy');
const InsertCollectionStrategy = require('../strategies/InsertCollectionStrategy');
const WebhookStrategy = require('../strategies/WebhookStrategy');

// This is a sample query config. You can create multiple query configs and export them from here.
module.exports = new QueryConfig({
  name: 'sample-query',
  enabled: false, // Set this to true to enable the query
  targetCollection: 'coll-name', // The collection to execute on
  executionType: 'watch', // 'watch' or 'cron' or 'once'
  // cronSchedule: '* * * * *', // Execute every minute
  // pipeline can be an array of aggregation pipeline stages or a function that returns an array of aggregation pipeline stages
  pipeline: [
    { 
      $match : {
        "operationType" : "insert",
      } 
    },
  ],
  // Strategies are the actions to be taken when the query results are computed.
  // Strategies are executed in the order they are defined.
  strategies: [
    // log the results to the console
    new LogStrategy(),
    // send the results as email
    new EmailStrategy({
      // handlebars template to use for generating the email body (see src\emailTemplates\<emailTemplateName>.hbs)
      emailTemplateName: 'myEmail',
      // email subject
      emailSubject: 'Testing email strategy',
      // condition to check if the email should be sent
      shouldSendEmail: (results) => results.length > 0,
      // list of email addresses to send the email to
      userEmails: [''],
    }),
    // insert the results into db collection
    new InsertCollectionStrategy({
      // collection to insert the results into
      targetCollection: 'newRecords',
      // function to transform the results before inserting into the collection
      processResults: (results) => results, // Implement your data transformation here
    }),
    // send the results as webhook
    new WebhookStrategy({
      // webhook url to send the results to
      webhookURL: 'https://example.com/webhook',
      // function to transform the results before sending to the webhook
      webhookTransformer: (results) => results, // Implement your data transformation here
    })
  ],
});
