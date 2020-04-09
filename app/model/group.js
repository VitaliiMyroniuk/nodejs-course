const uuid = require('uuid');
const Permissions = require('./permissions');

class Group {
    constructor(groupData) {
        this.id = uuid.v4();
        this.name = groupData.name;
        this.permissions = this.retrievePermissions(groupData);
    }

    retrievePermissions(groupData) {
        if (Array.isArray(groupData.permissions)) {
            const permissions = Object.values(Permissions);
            return groupData.permissions.filter(value => permissions.includes(value));
        }
        return [];
    }
}

module.exports = Group;
