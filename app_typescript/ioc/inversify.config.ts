import { Container } from "inversify";
import UserValidator from "../middleware/application/userValidator";
import UserController from "../controller/userController";
import UserService from "../service/userService";
import UserDao from "../dao/userDao";
import InMemoryDB from "../db/inMemoryDB";
import TYPES from "./types";

const container = new Container({ defaultScope: "Singleton" });

container.bind<UserValidator>(TYPES.UserValidator).to(UserValidator);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserDao>(TYPES.UserDao).to(UserDao);
container.bind<InMemoryDB>(TYPES.InMemoryDB).to(InMemoryDB);

export default container;
