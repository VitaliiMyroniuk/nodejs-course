import { injectable } from "inversify";

@injectable()
export default class InMemoryDB {

    private readonly _users: Map<String, any>;

    constructor() {
        this._users = new Map<String, any>();
    }

    get users(): Map<String, any> {
        return this._users;
    }
}
