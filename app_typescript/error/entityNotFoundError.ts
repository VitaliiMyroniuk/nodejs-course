export default class EntityNotFoundError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'EntityNotFoundError';
        Error.captureStackTrace(this, this.constructor);
    }
}
