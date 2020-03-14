const cors = require('cors');

const corsOptions = {
    origin: ['http://external.domain.com', /^http:\/\/nodejs-course\.com.*$/]
};
const corsHandler = cors(corsOptions);

module.exports = corsHandler;
