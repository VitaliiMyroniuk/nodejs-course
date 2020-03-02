import { NextFunction, Request, Response } from "express";
import EntityNotFoundError from "../../error/entityNotFoundError";
import UniqueIdentifierError from "../../error/uniqueIdentifierError";

export default class ModelSavingErrorHandler {

    public static getHandler(): any {
        return (err: Error, req: Request, res: Response, next: NextFunction): void => {
            if (err.name === EntityNotFoundError.name || err.name === UniqueIdentifierError.name) {
                res.status(400).json({
                    type: err.name,
                    message: err.message
                });
            } else {
                return next(err);
            }
        }
    }
}
