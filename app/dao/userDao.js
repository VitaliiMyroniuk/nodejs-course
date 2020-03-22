const db = require('../db/inMemoryDB');

const userDao = {

    createOrUpdateUser(user) {
        db.users.set(user.id, user);
        return user;
    },

    getAutoSuggestUsers(loginSubstring, limit) {
        return Array.from(db.users.values())
            .filter(user => user.login.includes(loginSubstring))
            .sort((a, b) => a.login.localeCompare(b.login))
            .slice(0, limit);
    },

    getUserById(id) {
        return db.users.get(id);
    },

    getUserByCredentials(login, password) {
        return Array.from(db.users.values())
            .filter(user => user.login === login)
            .find(user => user.password === password);
    },

    isLoginExisted(login) {
        return Array.from(db.users.values())
            .map(user => user.login)
            .includes(login);
    }
};

module.exports = userDao;
