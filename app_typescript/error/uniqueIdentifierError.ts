export default class UniqueIdentifierError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'UniqueIdentifierError';
        Error.captureStackTrace(this, this.constructor);
    }
}
