const User = require('../model/user');
const EntityNotFoundError = require('../error/entityNotFoundError');
const UniqueIdentifierError = require('../error/uniqueIdentifierError');
const userDao = require('../dao/userDao');

const userService = {

    createUser(userData) {
        validateLogin(userData.login);
        const user = new User(userData);
        return userDao.createOrUpdateUser(user);
    },

    getAutoSuggestUsers(loginSubstring, limit) {
        return userDao.getAutoSuggestUsers(loginSubstring, limit);
    },

    getUserById(id) {
        const user = userDao.getUserById(id);
        if (!user) {
            throw new EntityNotFoundError(`User with id ${id} not found`);
        }
        return user;
    },

    updateUser(id, userData) {
        const user = this.getUserById(id);
        if (user.login !== userData.login) {
            validateLogin(userData.login);
        }
        populateUser(user, userData);
        return userDao.createOrUpdateUser(user);
    },

    deleteUser(id) {
        const user = this.getUserById(id);
        user.isDeleted = true;
        return userDao.createOrUpdateUser(user);
    },

    restoreUser(id) {
        const user = this.getUserById(id);
        user.isDeleted = false;
        return userDao.createOrUpdateUser(user);
    }
};

function validateLogin(login) {
    const isLoginExisted = userDao.isLoginExisted(login);
    if (isLoginExisted) {
        throw new UniqueIdentifierError(`Login ${login} has already existed`);
    }
}

function populateUser(user, userData) {
    user.login = userData.login;
    user.password = userData.password;
    user.age = userData.age;
}

module.exports = userService;
