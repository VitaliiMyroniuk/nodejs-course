const { logger } = require('../logger/winstonLogger');

const handlerWrapper = (func) => {
    return (req, res, next) => {
        try {
            const start = new Date();
            func(req, res);
            const end = new Date();
            logger.info(`${req.method} ${req.url} successfully executed in ${end - start} ms`);
        } catch (err) {
            return next(err);
        }
    };
};

module.exports = handlerWrapper;
