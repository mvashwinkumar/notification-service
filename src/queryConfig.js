class QueryConfig {
    constructor({ name, pipeline, options, executionType, cronSchedule, targetCollection, strategies }) {
        this.name = name;
        this.pipeline = pipeline;
        this.options = options || {};
        this.cronSchedule = cronSchedule;
        this.targetCollection = targetCollection;
        this.executionType = executionType || 'once';
        this.strategies = strategies || [];
    }
}

module.exports = QueryConfig;