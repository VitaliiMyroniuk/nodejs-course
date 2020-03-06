const express = require('express');
const { logger } = require('../logger/winstonLogger');
const EntityNotFoundError = require('../error/entityNotFoundError');
const UniqueIdentifierError = require('../error/uniqueIdentifierError');
const userValidator = require('../validation/userValidator');
const userService = require('../service/userService');

const router = express.Router();

router.post('/users', userValidator, (req, res, next) => {
    try {
        const userData = req.body;
        const user = userService.createUser(userData);
        res.status(201).json(user);
    } catch (err) {
        return next(err);
    }
});

router.get('/users', (req, res, next) => {
    try {
        const { loginSubstring, limit } = req.query;
        const users = userService.getAutoSuggestUsers(loginSubstring, limit);
        res.status(200).json(users);
    } catch (err) {
        return next(err);
    }
});

router.get('/users/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const user = userService.getUserById(id);
        res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
});

router.put('/users/:id', userValidator, (req, res, next) => {
    try {
        const id = req.params.id;
        const userData = req.body;
        const user = userService.updateUser(id, userData);
        res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
});

router.delete('/users/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const user = userService.deleteUser(id);
        res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
});

router.patch('/users/:id/restore', (req, res, next) => {
    try {
        const id = req.params.id;
        const user = userService.restoreUser(id);
        res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
});

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
    logger.error(err.stack);
    res.status(500).json({
        message: 'Internal Server Error'
    });
}

module.exports = router;
