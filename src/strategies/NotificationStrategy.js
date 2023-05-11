class NotificationStrategy {
    constructor() { }

    async execute(results) {
        throw new Error('Method "execute" must be implemented in the derived class');
    }
}

module.exports = NotificationStrategy;