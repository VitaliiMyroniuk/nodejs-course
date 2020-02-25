const express = require('express');
const router = require('./controller/userController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', router);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port.`);
});
