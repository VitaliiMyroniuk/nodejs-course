const inMemoryDB = {
    users: new Map(),
    groups: new Map()
};

inMemoryDB.users.set('729f3068-eaf0-4f96-8812-d8d176b1892e', {
    'id': '729f3068-eaf0-4f96-8812-d8d176b1892e',
    'login': 'vitalii',
    'password': 'password',
    'age': 30,
    'groupId': '1b5cc429-ac5d-43a8-9341-2453d50c5c30',
    'isDeleted': false
});
inMemoryDB.groups.set('99cc2d01-1052-42d1-b59c-469b53f9bcb2', {
    'id': '99cc2d01-1052-42d1-b59c-469b53f9bcb2',
    'name': 'admins',
    'permissions': ['read', 'write', 'delete', 'share', 'upload files']
});
inMemoryDB.groups.set('147b2ad7-19e9-446e-90ab-965ecca593e9', {
    'id': '147b2ad7-19e9-446e-90ab-965ecca593e9',
    'name': 'users',
    'permissions': ['read', 'write', 'share', 'upload files']
});
inMemoryDB.groups.set('1b5cc429-ac5d-43a8-9341-2453d50c5c30', {
    'id': '1b5cc429-ac5d-43a8-9341-2453d50c5c30',
    'name': 'guests',
    'permissions': ['read']
});

module.exports = inMemoryDB;
