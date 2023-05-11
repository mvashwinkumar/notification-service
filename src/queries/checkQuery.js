const QueryConfig = require('../queryConfig');
const LogStrategy = require('../strategies/LogStrategy');
const EmailStrategy = require('../strategies/EmailStrategy');

const emailStrategy = new EmailStrategy({
  emailTemplateName: 'myEmail',
  shouldSendEmail: (results) => results.length > 0,
  userEmails: [''],
});

const query1 = new QueryConfig({
  name: 'checkQuery',
  pipeline: [
    { 
      $match : {
        "operationType" : "insert",
      } 
    },
  ],
  executionType: 'watch',
  targetCollection: 'coll-name',
  strategies: [new LogStrategy()], // Add more strategies here
});

module.exports = query1;