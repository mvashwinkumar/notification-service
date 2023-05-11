const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

const config = {
    mongo: {
        url: process.env.MONGO_URL,
        dbName: process.env.MONGO_DB_NAME,
    },
    email: {
        host: process.env.EMAIL_HOST,
        port: int(process.env.EMAIL_PORT),
        secure: process.env.EMAIL_SECURE,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    webhooks: {
        url: process.env.WEBHOOK_URL,
    },
};

console.log(`Config: ${JSON.stringify(config)}`);

module.exports = config;