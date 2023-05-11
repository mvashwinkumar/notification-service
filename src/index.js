const cron = require('node-cron');
const mongoService = require('./services/mongoService');
const checkQuery = require('./queries/checkQuery');
const query1 = require('./queries/query1');

// const queries = [query1];
const queries = [checkQuery];

const handleResults = async (query, results) => {
    for (const strategy of query.strategies) {
        await strategy.execute(results);
    }
};

console.log('Starting Notication Service...');
console.log(`Found ${queries.length} queries to execute: ${queries.map((query) => query.name).join(', ')}`);

queries.forEach((query) => {
    if (query.executionType === 'watch') {
        // Watch change streams
        mongoService.watchCollection(query.targetCollection, query.pipeline, async (change) => {
            const results = [change]; // You can modify this line based on how you want to process the change event
            await handleResults(query, results);
        });
    } else if (query.executionType === 'cron') {
        // Schedule cron jobs
        cron.schedule(query.cronSchedule, async () => {
            try {
                const results = await mongoService.executeAggregation(query.targetCollection, query.pipeline, query.options);
                await handleResults(query, results);
            } catch (error) {
                console.error(`Error executing query: ${error.message}`);
            }
        });
    } else if (query.executionType === 'once') {
        // Execute query once
        (async () => {
            try {
                const results = await mongoService.executeAggregation(query.targetCollection, query.pipeline, query.options);
                await handleResults(query, results);
            } catch (error) {
                console.error(`Error executing query: ${error.message}`);
            }
        })();
    } else {
        console.error(`Invalid execution type: ${query.executionType}`);
    }
});