const express = require('express');
const { logger, errorLogger } = require('../logger/winstonLogger');
const EntityNotFoundError = require('../error/entityNotFoundError');
const UniqueIdentifierError = require('../error/uniqueIdentifierError');
const { checkToken, authenticateUser } = require('../security/authentication');
const userValidator = require('../validation/userValidator');
const userService = require('../service/userService');

const router = express.Router();

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

function validationErrorHandler(err, req, res, next) {
    if (err && err.error && err.error.isJoi) {
        res.status(400).json({
            type: err.type,
            message: err.error.toString()
        });
    } else {
        return next(err);
    }
}

function modelSavingErrorHandler(err, req, res, next) {
    if (err instanceof EntityNotFoundError || err instanceof UniqueIdentifierError) {
        res.status(400).json({
            type: err.name,
            message: err.message
        });
    } else {
        return next(err);
    }
}

function commonErrorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({
        message: 'Internal Server Error'
    });
}

function handlerWrapper(func) {
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
}

module.exports = router;
