import { inject, injectable } from "inversify";
import EntityNotFoundError from "../error/entityNotFoundError";
import UniqueIdentifierError from "../error/uniqueIdentifierError";
import UserDao from "../dao/userDao";
import User from "../model/user";
import TYPES from "../ioc/types";

@injectable()
export default class UserService {

    private _userDao: UserDao;

    constructor(@inject(TYPES.UserDao) userDao: UserDao) {
        this._userDao = userDao;
    }

    createUser(userData: any): User {
        this.validateLogin(userData.login);
        const user: User = new User(userData);
        return this._userDao.createOrUpdateUser(user);
    }

    getAutoSuggestUsers(loginSubstring: string, limit: number): User[] {
        return this._userDao.getAutoSuggestUsers(loginSubstring, limit);
    }

    getUserById(id: string): User {
        const user: User = this._userDao.getUserById(id);
        if (!user) {
            throw new EntityNotFoundError(`User with id ${ id } not found`);
        }
        return user;
    }

    updateUser(id: string, userData: any): User {
        const user: User = this.getUserById(id);
        if (user.login !== userData.login) {
            this.validateLogin(userData.login);
        }
        this.populateUser(user, userData);
        return this._userDao.createOrUpdateUser(user);
    }

    deleteUser(id: string): User {
        const user: User = this.getUserById(id);
        user.isDeleted = true;
        return this._userDao.createOrUpdateUser(user);
    }

    restoreUser(id: string): User {
        const user: User = this.getUserById(id);
        user.isDeleted = false;
        return this._userDao.createOrUpdateUser(user);
    }

    protected validateLogin(login: string): void {
        const isLoginExisted: boolean = this._userDao.isLoginExisted(login);
        if (isLoginExisted) {
            throw new UniqueIdentifierError(`Login ${ login } has already existed`);
        }
    }

    protected populateUser(user: User, userData: any): void {
        user.login = userData.login;
        user.password = userData.password;
        user.age = userData.age;
    }
}
