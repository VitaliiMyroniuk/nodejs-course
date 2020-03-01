import { v4 as uuidv4 } from "uuid";

export default class User {

    private _id: string;
    private _login: string;
    private _password: string;
    private _age: number;
    private _isDeleted: boolean;

    constructor(userData: any) {
        this._id = uuidv4();
        this._login = userData.login;
        this._password = userData.password;
        this._age = userData.age;
        this._isDeleted = false;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get login(): string {
        return this._login;
    }

    set login(value: string) {
        this._login = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        this._age = value;
    }

    get isDeleted(): boolean {
        return this._isDeleted;
    }

    set isDeleted(value: boolean) {
        this._isDeleted = value;
    }
}
