const jwt = require('jsonwebtoken');
const userService = require('../service/userService');

const SECRET_KEY = '3d560d3c-3714-4750-aa93-cd6a30b4f261';

const authenticateUser = (req, res) => {
    const { login, password } = req.body;
    const user = userService.getUserByCredentials(login, password);
    if (user) {
        const token = jwt.sign({ login: user.login, age: user.age }, SECRET_KEY, { expiresIn: '40m' });
        res.status(200).json({ token });
    } else {
        res.status(401).json({
            message: 'Incorrect login or password'
        });
    }
};

const checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, SECRET_KEY, err => {
            if (err) {
                return res.status(403).json({
                    message: 'Invalid access token'
                });
            }
            next();
        });
    } else {
        res.status(401).json({
            message: 'No access token provided'
        });
    }
};

module.exports = { checkToken, authenticateUser };
