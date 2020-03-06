const express = require('express');
const requestLogger = require('./logger/winstonLogger');
const router = require('./controller/userController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(requestLogger);
app.use('/', router);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port.`);
});
