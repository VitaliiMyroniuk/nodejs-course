const db = require('../db/inMemoryDB');

const groupDao = {

    getAllGroups() {
        return Array.from(db.groups.values());
    },

    getGroupById(id) {
        return db.groups.get(id);
    }
};

module.exports = groupDao;
