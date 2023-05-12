const { MongoClient } = require('mongodb');

const { mongo } = require('../config');

// singleton pattern
let client;

const connect = async () => {
    if (!(client && client?.isConnected?.())) {
        client = new MongoClient(mongo.url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
    }
    return client.db(mongo.dbName)
};

const getAggregationPipeline = (queryPipeline) => {
    // if queryPipeline is a function, execute it to get the pipeline
    return Array.isArray(queryPipeline) ? queryPipeline : queryPipeline();
}

const executeAggregation = async (targetCollection, pipeline, options) => {
    const db = await connect();
    const collection = db.collection(targetCollection);

    try {
        return await collection.aggregate(getAggregationPipeline(pipeline), options).toArray();
    } catch (error) {
        console.error(`Error executing aggregation: ${error.message}`);
        throw error;
    }
};

const insertDocuments = async (targetCollection, documents) => {
    const db = await connect();
    const collection = db.collection(targetCollection);

    try {
        await collection.insertMany(documents);
    } catch (error) {
        console.error(`Error inserting documents: ${error.message}`);
        throw error;
    }
};

async function watchCollection(targetCollection, pipeline, callback) {
    const db = await connect();
    const collection = db.collection(targetCollection);

    collection.watch(getAggregationPipeline(pipeline), { fullDocumentBeforeChange: "whenAvailable" }).on('change', async (change) => {
        try {
            await callback(change);
            console.log(`Change detected and processed`);
        } catch (error) {
            console.error(`Error processing change: ${error.message}`);
            console.error(error.stack);
        }
    });
}

module.exports = {
    executeAggregation,
    insertDocuments,
    watchCollection,
};