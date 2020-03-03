const request = require('supertest');
const server = require('../api/server');
const users = require('../users/userModel');

describe('user router', function() {
    test('should run the test', function() {
        expect(true).toBe(true);
    });

    //login
    beforeAll((done) => {
        request(server)
            .post('/api/auth/login')
            .send({
                username: 'showmethemoney',
                password: 'showmethemoney'
            })
            .end((err, res) => {
                token = res.body.token; // save the token!
                done();
        });
    });

    describe('GET /', () => {
        test('should return 200 ok with correct credentials', async () => {
            const res = await request(server).get('/api/users').set('Authorization', token);
            expect(res.status).toBe(200);
        })

        test('should return an array of user objects', async () => {
            const res = await request(server).get('/api/users').set('Authorization', token);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body[0]).toMatchObject({
                id: expect.any(Number),
                username: expect.any(String),
                role: expect.any(String),
                first_name: expect.any(String),
                last_name: expect.any(String),
                email: expect.any(String)
            });
        });
    });

    describe('GET /:id', () => {
        const id = 1;
        test('should return 200 ok with correct credentials', async () => {
            const res = await request(server).get(`/api/users/${id}`).set('Authorization', token);
            expect(res.status).toBe(200);
        })

        test('should return an array of user objects', async () => {
            const res = await request(server).get(`/api/users/${id}`).set('Authorization', token);
            expect(res.body).toMatchObject({
                id: expect.any(Number),
                username: expect.any(String),
                role: expect.any(String),
                first_name: expect.any(String),
                last_name: expect.any(String),
                email: expect.any(String)
            });
        });
    });

    describe('GET /getby/filter', () => {
        const filter = {
            username: 'hendrix'
        };
        test('should return 200 ok with correct credentials', async () => {
            const res = await (await request(server).get(`/api/users/getby/filter`).send(filter).set('Authorization', token));
            expect(res.status).toBe(200);
        })

        test('should return an array of user objects', async () => {
            const res = await request(server).get(`/api/users/getby/filter`).send(filter).set('Authorization', token);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body[0]).toMatchObject({
                id: expect.any(Number),
                username: expect.stringMatching(filter.username),
                role: expect.any(String),
                first_name: expect.any(String),
                last_name: expect.any(String),
                email: expect.any(String)
            });
        });
    });

    describe('GET /asker/:id/tickets', () => {
        const id = 4;
        test('should return 200 ok with correct credentials', async () => {
            const res = await request(server).get(`/api/users/asker/${id}/tickets`).set('Authorization', token);
            expect(res.status).toBe(200);
        })

        test('should return an array of user objects', async () => {
            const res = await request(server).get(`/api/users/asker/${id}/tickets`).set('Authorization', token);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body[0].asker.id).toBe(id);
            expect(res.body[0]).toMatchObject({
                id: expect.any(Number),
                created_at: expect.stringMatching("2020-03-03 17:46:09"),
                title: expect.any(String),
                description: expect.any(String),
                category: expect.any(String),
                resolved: expect.any(Boolean),
                being_solved: expect.any(Boolean),
                asker: expect.objectContaining({
                    id: expect.any(Number),
                    username: expect.any(String),
                    role: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    email: expect.any(String)
                }),
                comments: expect.any(Array)
            });
        });
    });

    describe('GET /solvedby/:id/tickets', () => {
        const id = 4;
        test('should return 204 no content when there are not any tickets that have been solved by the user with correct credentials', async () => {
            const res = await request(server).get(`/api/users/solvedby/${id}/tickets`).set('Authorization', token);
            expect(res.status).toBe(204);
        });
    });

    describe('GET /assignee/:id/tickets', () => {
        const id = 4;
        test('should return 204 no content when there are not any tickets that have been assigned to the user with correct credentials', async () => {
            const res = await request(server).get(`/api/users/assignee/${id}/tickets`).set('Authorization', token);
            expect(res.status).toBe(204);
        });
    });

    describe('GET /:id/alltickets', () => {
        const id = 4;
        test('should return 200 ok with correct credentials', async () => {
            const res = await request(server).get(`/api/users/${id}/alltickets`).set('Authorization', token);
            expect(res.status).toBe(200);
        })

        test('should return an array of user objects', async () => {
            const res = await request(server).get(`/api/users/${id}/alltickets`).set('Authorization', token);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body[0].asker.id).toBe(id);
            expect(res.body[0]).toMatchObject({
                id: expect.any(Number),
                created_at: expect.stringMatching("2020-03-03 17:46:09"),
                title: expect.any(String),
                description: expect.any(String),
                category: expect.any(String),
                resolved: expect.any(Boolean),
                being_solved: expect.any(Boolean),
                asker: expect.objectContaining({
                    id: expect.any(Number),
                    username: expect.any(String),
                    role: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    email: expect.any(String)
                }),
                comments: expect.any(Array)
            });
        });
    });

    describe('GET /:id/allopentickets', () => {
        const id = 4;
        test('should return 200 ok with correct credentials', async () => {
            const res = await request(server).get(`/api/users/${id}/allopentickets`).set('Authorization', token);
            expect(res.status).toBe(200);
        });

        test('should return an array of user objects', async () => {
            const res = await request(server).get(`/api/users/${id}/allopentickets`).set('Authorization', token);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body[0].asker.id).toBe(id);
            expect(res.body[0].resolved).toBe(false);
            expect(res.body[0]).toMatchObject({
                id: expect.any(Number),
                created_at: expect.stringMatching("2020-03-03 17:46:09"),
                title: expect.any(String),
                description: expect.any(String),
                category: expect.any(String),
                resolved: expect.any(Boolean),
                being_solved: expect.any(Boolean),
                asker: expect.objectContaining({
                    id: expect.any(Number),
                    username: expect.any(String),
                    role: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    email: expect.any(String)
                }),
                comments: expect.any(Array)
            });
        });
    });

    describe('POST /, PUT /:id, DELETE /:id', async () => {
        const res = await request(server)
            .post(`/api/users`)
            .send({ 
                username: 'testuserauth', 
                password: "password", 
                role: 'student',
                first_name: 'Testy',
                last_name: 'McTest',
                email: 'a@b.com'
            })
            .set('Authorization', token);

        test('POST should return 201 ok with correct credentials and return the added user', () => {
            expect(res.status).toBe(201);
            expect(res.body).toMatchObject({
                id: expect.any(Number),
                username: expect.stringMatching('testuserauth'),
                role: expect.stringMatching('student'),
                first_name: expect.stringMatching('Testy'),
                last_name: expect.stringMatching('McTest'),
                email: expect.stringMatching('a@b.com')
            });
        });

        test('PUT should return 200 and return user with changes with correct credentials', async () => {
            const response = await request(server)
                .post(`/api/users/${res.body.id}`)
                .send({ 
                    last_name: 'McTestFace'
                })
                .set('Authorization', token);
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(res.body.id);
            expect(response.body).toMatchObject({
                id: expect.any(Number),
                username: expect.stringMatching('testuserauth'),
                role: expect.stringMatching('student'),
                first_name: expect.stringMatching('Testy'),
                last_name: expect.stringMatching('McTestFace'),
                email: expect.stringMatching('a@b.com')
            });
        })

        test('DELETE /:id should return 200 and the deleted user with correct credentials', async () => {
            const response = await request(server)
                .delete(`/api/users/${res.body.id}`)
                .set('Authorization', token);
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(res.body.id);
            expect(response.body).toMatchObject({
                id: expect.any(Number),
                username: expect.stringMatching('testuserauth'),
                role: expect.stringMatching('student'),
                first_name: expect.stringMatching('Testy'),
                last_name: expect.stringMatching('McTestFace'),
                email: expect.stringMatching('a@b.com')
            });
        });
    });
});