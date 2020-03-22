const EntityNotFoundError = require('../error/entityNotFoundError');
const groupDao = require('../dao/groupDao');

const groupService = {

    getAllGroups() {
        return groupDao.getAllGroups();
    },

    getGroupById(id) {
        const group = groupDao.getGroupById(id);
        if (!group) {
            throw new EntityNotFoundError(`Group with id ${id} not found`);
        }
        return group;
    },

    isGroupExisted(id) {
        return groupDao.isGroupExisted(id);
    }
};

module.exports = groupService;
