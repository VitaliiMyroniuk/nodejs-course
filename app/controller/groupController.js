const express = require('express');
const { errorLogger } = require('../logger/winstonLogger');
const { modelSavingErrorHandler, commonErrorHandler } = require('../handler/errorHandler');
const { checkToken } = require('../security/authentication');
const corsHandler = require('../security/corsHandler');
const handlerWrapper = require('../wrapper/handlerWrapper');
const groupService = require('../service/groupService');

const router = express.Router();

router.options('*', corsHandler);

router.get('/groups', checkToken, handlerWrapper((req, res) => {
    const groups = groupService.getAllGroups();
    res.status(200).json(groups);
}));

router.get('/groups/:id', checkToken, handlerWrapper((req, res) => {
    const id = req.params.id;
    const group = groupService.getGroupById(id);
    res.status(200).json(group);
}));

router.use(errorLogger);

router.use(modelSavingErrorHandler);

router.use(commonErrorHandler);

module.exports = router;
