import { inject, injectable } from "inversify";
import User from "../model/user";
import InMemoryDB from "../db/inMemoryDB";
import TYPES from "../ioc/types";

@injectable()
export default class UserDao {

    private _db: InMemoryDB;

    constructor(@inject(TYPES.InMemoryDB) db: InMemoryDB) {
        this._db = db;
    }

    createOrUpdateUser(user: User): User {
        this._db.users.set(user.id, user);
        return user;
    }

    getAutoSuggestUsers(loginSubstring: string, limit: number): User[] {
        return Array.from(this._db.users.values())
            .filter(user => user.login.includes(loginSubstring))
            .sort((a, b) => a.login.localeCompare(b.login))
            .slice(0, limit);
    }

    getUserById(id: string): User {
        return this._db.users.get(id);
    }

    isLoginExisted(login: string): boolean {
        return Array.from(this._db.users.values())
            .map(user => user.login)
            .includes(login);
    }
}
