const EntityNotFoundError = require('../../../../app/error/entityNotFoundError');

describe('test groupService methods', () => {

    let testInstance;

    const groupDaoMock = jest.genMockFromModule('../../../../app/dao/groupDao');

    const allGroups = [
        {
            id: '1b5cc429-ac5d-43a8-9341-2453d50c5c30',
            name: 'guests',
            permissions: [
                'read'
            ]
        }
    ];
    const group = {
        id: '1b5cc429-ac5d-43a8-9341-2453d50c5c30',
        name: 'guests',
        permissions: [
            'read'
        ]
    };

    beforeAll(() => {
        jest.setMock('../../../../app/dao/groupDao', groupDaoMock);
        testInstance = require('../../../../app/service/groupService');
    });

    beforeEach(() => {
        groupDaoMock.getAllGroups = jest.fn(() => allGroups);
        groupDaoMock.getGroupById = jest.fn(id => group);
        groupDaoMock.isGroupExisted = jest.fn(id => true);
    });

    test('should return all groups', () => {
        const actualResult = testInstance.getAllGroups();

        expect(actualResult).toEqual(allGroups);
    });

    test('should throw EntityNotFoundError when group is not found by id', () => {
        groupDaoMock.getGroupById = jest.fn(id => undefined);

        expect(() => {
            testInstance.getGroupById('1b5cc429-ac5d-43a8-9341-2453d50c5c30');
        }).toThrow(new EntityNotFoundError(`Group with id 1b5cc429-ac5d-43a8-9341-2453d50c5c30 not found`));
    });

    test('should return group by id', () => {
        const actualResult = testInstance.getGroupById('1b5cc429-ac5d-43a8-9341-2453d50c5c30');

        expect(actualResult).toEqual(group);
    });

    test('should return true when group is existed', () => {
        const actualResult = testInstance.isGroupExisted();

        expect(actualResult).toEqual(true);
    });

    test('should return false when group is not existed', () => {
        groupDaoMock.isGroupExisted = jest.fn(id => false);

        const actualResult = testInstance.isGroupExisted();

        expect(actualResult).toEqual(false);
    });
});
