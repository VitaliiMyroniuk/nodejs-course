const express = require('express');
const { logger, requestLogger } = require('./logger/winstonLogger');
const corsHandler = require('./security/corsHandler');
const userRouter = require('./controller/userController');
const groupRouter = require('./controller/groupController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(requestLogger);
app.use(corsHandler);
app.use('/', userRouter);
app.use('/', groupRouter);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port.`);
});

process.on('unhandledRejection', err => logger.error(err.stack));
process.on('uncaughtException', err => {
    logger.error(err.stack);
    process.exit(1);
});
