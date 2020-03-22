const Joi = require('@hapi/joi');
const validator = require('express-joi-validation').createValidator({ passError: true });

const schema = Joi.object().keys({
    login: Joi.string().max(255).required(),
    password: Joi.string().alphanum().min(6).max(30).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    groupId: Joi.string().max(255).required()
});

const joiConf = {
    joi: {
        allowUnknown: true,
        abortEarly: false
    }
};

module.exports = validator.body(schema, joiConf);
