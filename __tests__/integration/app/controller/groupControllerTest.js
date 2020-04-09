const request = require('supertest');
const app = require('../../../../app/app');

describe('test groupController methods', () => {
    let jwt;

    beforeAll(() => {
        request(app)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({
                login: 'vitalii',
                password: 'password'
            })
            .end((err, res) => {
                expect(res.status).toBe(200);
                expect(res.type).toEqual('application/json');
                jwt = res.body.token;
            });
    });

    test('should return 401 error when GET /groups invoked without access token', () => {
        return request(app)
            .get('/groups')
            .then(res => {
                expect(res.statusCode).toBe(401);
                expect(res.type).toEqual('application/json');
                expect(res.body).toEqual({ 'message': 'No access token provided' });
            });
    });

    test('should return 403 error when GET /groups invoked with invalid access token', () => {
        return request(app)
            .get('/groups')
            .set('x-access-token', 'invalid-access-token')
            .then(res => {
                expect(res.statusCode).toBe(403);
                expect(res.type).toEqual('application/json');
                expect(res.body).toEqual({ 'message': 'Invalid access token' });
            });
    });

    test('should return 200 response when GET /groups invoked', () => {
        return request(app)
            .get('/groups')
            .set('x-access-token', jwt)
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toEqual('application/json');
                expect(res.body).toEqual([
                    {
                        id: '99cc2d01-1052-42d1-b59c-469b53f9bcb2',
                        name: 'admins',
                        permissions: ['read', 'write', 'delete', 'share', 'upload files']
                    },
                    {
                        id: '147b2ad7-19e9-446e-90ab-965ecca593e9',
                        name: 'users',
                        permissions: ['read', 'write', 'share', 'upload files']
                    },
                    {
                        id: '1b5cc429-ac5d-43a8-9341-2453d50c5c30',
                        name: 'guests',
                        permissions: ['read']
                    }
                ]);
            });
    });

    test('should return 400 error when GET /groups/{id} invoked with invalid id', () => {
        return request(app)
            .get('/groups/4375ffa6-7a99-4abf-b18c-ca189129d8c2')
            .set('x-access-token', jwt)
            .then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.type).toEqual('application/json');
                expect(res.body).toEqual({
                    "type": "EntityNotFoundError",
                    "message": "Group with id 4375ffa6-7a99-4abf-b18c-ca189129d8c2 not found"
                });
            });
    });

    test('should return 401 error when GET /groups/{id} invoked without access token', () => {
        return request(app)
            .get('/groups/729f3068-eaf0-4f96-8812-d8d176b1892e')
            .then(res => {
                expect(res.statusCode).toBe(401);
                expect(res.type).toEqual('application/json');
                expect(res.body).toEqual({ 'message': 'No access token provided' });
            });
    });

    test('should return 403 error when GET /groups/{id} invoked with invalid access token', () => {
        return request(app)
            .get('/groups/729f3068-eaf0-4f96-8812-d8d176b1892e')
            .set('x-access-token', 'invalid-access-token')
            .then(res => {
                expect(res.statusCode).toBe(403);
                expect(res.type).toEqual('application/json');
                expect(res.body).toEqual({ 'message': 'Invalid access token' });
            });
    });

    test('should return 200 response when GET /groups/{id} invoked', () => {
        return request(app)
            .get('/groups/1b5cc429-ac5d-43a8-9341-2453d50c5c30')
            .set('x-access-token', jwt)
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toEqual('application/json');
                expect(res.body).toEqual({
                    id: '1b5cc429-ac5d-43a8-9341-2453d50c5c30',
                    name: 'guests',
                    permissions: ['read']
                });
            });
    });
});
