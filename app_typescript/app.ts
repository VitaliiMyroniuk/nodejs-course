import "reflect-metadata";
import express, { Application } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import ModelSavingErrorHandler from "./middleware/error/modelSavingErrorHandler";
import ValidationErrorHandler from "./middleware/error/validationErrorHandler";
import container from "./ioc/inversify.config";

export default class App {

    private static PORT: number = 3000;

    private _app: Application;

    constructor() {
        this._app = new InversifyExpressServer(container)
            .setConfig((app) => {
                app.use(express.json());
            })
            .setErrorConfig((app) => {
                app.use(ValidationErrorHandler.getHandler());
                app.use(ModelSavingErrorHandler.getHandler());
            })
            .build();
    }

    start() {
        this._app.listen(App.PORT, () => console.log(`Server is running on ${ App.PORT } port.`))
    }
}
