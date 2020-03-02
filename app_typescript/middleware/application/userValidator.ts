import Joi, { Schema, ValidationOptions, ValidationResult } from "@hapi/joi";
import { NextFunction, Request, Response } from "express";
import { BaseMiddleware } from "inversify-express-utils";
import { injectable } from "inversify";

@injectable()
export default class UserValidator extends BaseMiddleware {

    private static SCHEMA: Schema = Joi.object().keys({
        login: Joi.string().max(255).required(),
        password: Joi.string().alphanum().min(6).max(30).required(),
        age: Joi.number().integer().min(4).max(130).required()
    });
    private static VALIDATION_OPTIONS: ValidationOptions = {
        allowUnknown: true,
        abortEarly: false
    };

    handler(req: Request, res: Response, next: NextFunction): void {
        const { error }: ValidationResult = UserValidator.SCHEMA.validate(req.body, UserValidator.VALIDATION_OPTIONS);
        if (error) {
            next(error)
        } else {
            next();
        }
    }
}
