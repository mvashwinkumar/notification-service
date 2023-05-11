const fs = require('fs');
const path = require('path');

const cron = require('node-cron');
const mongoService = require('./services/mongoService');

const loadQueries = () => {
    const queryFolderPath = path.join(__dirname, 'queries');
    const queryFiles = fs.readdirSync(queryFolderPath);
    const queries = queryFiles.map((file) => require(path.join(queryFolderPath, file)));
    return queries;
}

const handleResults = async (query, results) => {
    for (const strategy of query.strategies) {
        await strategy.execute(results);
    }
};

console.log('Starting Notication Service...');

const queries = loadQueries();
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
                console.error(error.stack);
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
                console.error(error.stack);
            }
        })();
    } else {
        console.error(`Invalid execution type: ${query.executionType}`);
    }
    console.log(`Query ${query.name} setup for execution`);
});