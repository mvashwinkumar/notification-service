class QueryConfig {
    constructor({ name, enabled, pipeline, options, executionType, cronSchedule, targetCollection, strategies }) {
        this.name = name;
        this.enabled = enabled || false;
        // Array of aggregation pipeline stages or function that returns an array of aggregation pipeline stages
        this.pipeline = pipeline;
        this.options = options || {};
        this.cronSchedule = cronSchedule;
        this.targetCollection = targetCollection;
        this.executionType = executionType || 'once';
        this.strategies = strategies || [];
    }
}

module.exports = QueryConfig;