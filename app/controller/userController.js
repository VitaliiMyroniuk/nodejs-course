const express = require('express');
const EntityNotFoundError = require('../error/entityNotFoundError');
const UniqueIdentifierError = require('../error/uniqueIdentifierError');
const userService = require('../service/userService');

const router = express.Router();

router.post('/users', (req, res, next) => {
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

router.put('/users/:id', (req, res, next) => {
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

router.use(modelSavingErrorHandler);

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

module.exports = router;
