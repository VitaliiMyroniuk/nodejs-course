class EntityNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'EntityNotFoundError';
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = EntityNotFoundError;
