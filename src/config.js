const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

const config = {
    mongo: {
        url: process.env.MONGO_URL,
        dbName: process.env.MONGO_DB_NAME,
    },
    email: {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        secure: process.env.EMAIL_SECURE === 'true',
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        from: process.env.EMAIL_FROM,
    },
    webhooks: {
        url: process.env.WEBHOOK_URL,
    },
};

console.log(`Config: ${JSON.stringify(config)}`);

module.exports = config;