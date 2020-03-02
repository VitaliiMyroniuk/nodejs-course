import { NextFunction, Request, Response } from "express";

export default class ValidationErrorHandler {

    public static getHandler(): any {
        return (err: Error, req: Request, res: Response, next: NextFunction): void => {
            if (err.name === 'ValidationError') {
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
