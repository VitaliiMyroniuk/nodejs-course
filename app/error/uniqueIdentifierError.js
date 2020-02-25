class UniqueIdentifierError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UniqueIdentifierError';
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = UniqueIdentifierError;
