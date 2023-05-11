const NotificationStrategy = require('./NotificationStrategy');
const mongoService = require('../services/mongoService');

class InsertCollectionStrategy extends NotificationStrategy {
  constructor({ targetCollection, processResults }) {
    super();
    this.targetCollection = targetCollection;
    this.processResults = processResults;
  }

  async execute(results) {
    const transformedResults = this.processResults ? this.processResults(results) : results;
    await mongoService.insertDocuments(this.targetCollection, transformedResults);
  }
}

module.exports = InsertCollectionStrategy;