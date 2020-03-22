const uuid = require('uuid');

class User {
    constructor(userData) {
        this.id = uuid.v4();
        this.login = userData.login;
        this.password = userData.password;
        this.age = userData.age;
        this.groupId = userData.groupId;
        this.isDeleted = false;
    }
}

module.exports = User;
