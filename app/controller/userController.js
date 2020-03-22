const express = require('express');
const { errorLogger } = require('../logger/winstonLogger');
const { validationErrorHandler, modelSavingErrorHandler, commonErrorHandler } = require('../handler/errorHandler');
const { checkToken, authenticateUser } = require('../security/authentication');
const corsHandler = require('../security/corsHandler');
const handlerWrapper = require('../wrapper/handlerWrapper');
const userValidator = require('../validation/userValidator');
const userService = require('../service/userService');

const router = express.Router();

router.options('*', corsHandler);

router.post('/login', handlerWrapper((req, res) => {
    authenticateUser(req, res);
}));

router.post('/users', userValidator, handlerWrapper((req, res) => {
    const userData = req.body;
    const user = userService.createUser(userData);
    res.status(201).json(user);
}));

router.get('/users', checkToken, handlerWrapper((req, res) => {
    const { loginSubstring, limit } = req.query;
    const users = userService.getAutoSuggestUsers(loginSubstring, limit);
    res.status(200).json(users);
}));

router.get('/users/:id', checkToken, handlerWrapper((req, res) => {
    const id = req.params.id;
    const user = userService.getUserById(id);
    res.status(200).json(user);
}));

router.put('/users/:id', checkToken, userValidator, handlerWrapper((req, res) => {
    const id = req.params.id;
    const userData = req.body;
    const user = userService.updateUser(id, userData);
    res.status(200).json(user);
}));

router.delete('/users/:id', checkToken, handlerWrapper((req, res) => {
    const id = req.params.id;
    const user = userService.deleteUser(id);
    res.status(200).json(user);
}));

router.patch('/users/:id/restore', checkToken, handlerWrapper((req, res) => {
    const id = req.params.id;
    const user = userService.restoreUser(id);
    res.status(200).json(user);
}));

router.use(errorLogger);

router.use(validationErrorHandler);

router.use(modelSavingErrorHandler);

router.use(commonErrorHandler);

module.exports = router;
