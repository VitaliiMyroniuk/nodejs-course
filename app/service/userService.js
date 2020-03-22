const User = require('../model/user');
const EntityNotFoundError = require('../error/entityNotFoundError');
const UniqueIdentifierError = require('../error/uniqueIdentifierError');
const groupService = require('./groupService');
const userDao = require('../dao/userDao');

const userService = {

    createUser(userData) {
        validateLogin(userData.login);
        validateGroupId(userData.groupId);
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

    getUserByCredentials(login, password) {
        return userDao.getUserByCredentials(login, password);
    },

    updateUser(id, userData) {
        const user = this.getUserById(id);
        if (user.login !== userData.login) {
            validateLogin(userData.login);
        }
        validateGroupId(userData.groupId);
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
    },

    getUserGroup(id) {
        const user = this.getUserById(id);
        return groupService.getGroupById(user.groupId);
    }
};

function validateLogin(login) {
    const isLoginExisted = userDao.isLoginExisted(login);
    if (isLoginExisted) {
        throw new UniqueIdentifierError(`Login ${login} has already existed`);
    }
}

function validateGroupId(groupId) {
    const isGroupExisted = groupService.isGroupExisted(groupId);
    if (!isGroupExisted) {
        throw new EntityNotFoundError(`Group with id ${groupId} not found`);
    }
}

function populateUser(user, userData) {
    user.login = userData.login;
    user.password = userData.password;
    user.age = userData.age;
}

module.exports = userService;
