import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import UserService from "../service/userService";
import User from "../model/user";
import TYPES from "../ioc/types";
import {
    controller,
    httpDelete,
    httpGet,
    httpPatch,
    httpPost,
    httpPut,
    interfaces,
    next,
    queryParam,
    request,
    requestBody,
    requestParam,
    response
} from "inversify-express-utils";

@controller("/users")
export default class UserController implements interfaces.Controller {

    private _userService: UserService;

    constructor(@inject(TYPES.UserService) userService: UserService) {
        this._userService = userService;
    }

    @httpPost("/", TYPES.UserValidator)
    private createUser(@request() req: Request,
                       @response() res: Response,
                       @next() next: NextFunction): void {
        try {
            const userData: any = req.body;
            const user: User = this._userService.createUser(userData);
            res.status(201).json(user);
        } catch (err) {
            return next(err);
        }
    }

    @httpGet("/")
    private getAutoSuggestUsers(@queryParam("loginSubstring") loginSubstring: string,
                                @queryParam("limit") limit: number,
                                @response() res: Response,
                                @next() next: NextFunction): void {
        try {
            const users: User[] = this._userService.getAutoSuggestUsers(loginSubstring, limit);
            res.status(200).json(users);
        } catch (err) {
            return next(err);
        }
    }

    @httpGet("/:id")
    private getUserById(@requestParam("id") id: string,
                        @response() res: Response,
                        @next() next: NextFunction): void {
        try {
            const user: User = this._userService.getUserById(id);
            res.status(200).json(user);
        } catch (err) {
            return next(err);
        }
    }

    @httpPut("/:id", TYPES.UserValidator)
    private updateUser(@requestParam("id") id: string,
                       @requestBody() userData: void,
                       @response() res: Response,
                       @next() next: NextFunction): void {
        try {
            const user: User = this._userService.updateUser(id, userData);
            res.status(200).json(user);
        } catch (err) {
            return next(err);
        }
    }

    @httpDelete("/:id")
    private deleteUser(@requestParam("id") id: string,
                       @response() res: Response,
                       @next() next: NextFunction): void {
        try {
            const user: User = this._userService.deleteUser(id);
            res.status(200).json(user);
        } catch (err) {
            return next(err);
        }
    }

    @httpPatch("/:id/restore")
    private restoreUser(@requestParam("id") id: string,
                        @response() res: Response,
                        @next() next: NextFunction): void {
        try {
            const user: User = this._userService.restoreUser(id);
            res.status(200).json(user);
        } catch (err) {
            return next(err);
        }
    }
}
