class LogStrategy {
    constructor() { }

    async execute(results) {
        console.log(`Logging results: ${JSON.stringify(results)}`);
    }
}

module.exports = LogStrategy;