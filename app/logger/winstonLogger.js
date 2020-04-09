const winston = require('winston');

const FILE_OPTIONS = {
    level: process.env.FILE_LOGGER_LEVEL,
    filename: './logs/app.log',
    maxsize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
    )
};

const CONSOLE_OPTIONS = {
    level: process.env.CONSOLE_LOGGER_LEVEL,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
    )
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(FILE_OPTIONS),
        new winston.transports.Console(CONSOLE_OPTIONS)
    ]
});

const requestLogger = (req, res, next) => {
    const message = `${req.method} ${req.url} \n    Request Body: ${JSON.stringify(req.body)}`;
    logger.info(message);
    next();
};

const errorLogger = (err, req, res, next) => {
    const errorStack = err.error && err.error.isJoi ? err.error.stack : err.stack;
    const message = `${req.method} ${req.url} \n    Request Body: ${JSON.stringify(req.body)} \n    ${errorStack}`;
    logger.error(message);
    next(err);
};

module.exports = { logger, requestLogger, errorLogger };
