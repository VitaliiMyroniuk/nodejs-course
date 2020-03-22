const EntityNotFoundError = require('../error/entityNotFoundError');
const UniqueIdentifierError = require('../error/uniqueIdentifierError');

const validationErrorHandler = (err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        res.status(400).json({
            type: err.type,
            message: err.error.toString()
        });
    } else {
        return next(err);
    }
};

const modelSavingErrorHandler = (err, req, res, next) => {
    if (err instanceof EntityNotFoundError || err instanceof UniqueIdentifierError) {
        res.status(400).json({
            type: err.name,
            message: err.message
        });
    } else {
        return next(err);
    }
};

const commonErrorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({
        message: 'Internal Server Error'
    });
};

module.exports = { validationErrorHandler, modelSavingErrorHandler, commonErrorHandler };
