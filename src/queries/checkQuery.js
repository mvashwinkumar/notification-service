const QueryConfig = require('../queryConfig');
const LogStrategy = require('../strategies/LogStrategy');

const query1 = new QueryConfig({
  name: 'checkQuery',
  pipeline: [
    { 
      $match : {
        "operationType" : "insert",
        "fullDocument._id:" : ''
      } 
    },
  ],
  executionType: 'watch',
  targetCollection: 'coll-name',
  strategies: [new LogStrategy()], // Add more strategies here
});

module.exports = query1;