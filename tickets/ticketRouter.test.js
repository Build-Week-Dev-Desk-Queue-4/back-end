const request = require('supertest');
const server = require('../api/server');
const comments = require('../comments/commentModel');

describe('Jokes router', function() {
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
            const res = await request(server).get('/api/tickets').set('Authorization', token);
            expect(res.status).toBe(200);
        })

        test('should return an array of ticket objects', async () => {
            const res = await request(server).get('/api/tickets').set('Authorization', token);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body[0]).toMatchObject({
                id: expect.any(Number),
                created_at: expect.any(String),
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

    describe('GET /:id', () => {
        const id = 1;
        test('should return 200 ok with correct credentials', async () => {
            const res = await request(server).get(`/api/tickets/${id}`).set('Authorization', token);
            expect(res.status).toBe(200);
        })

        test('should return an array a ticket object that matches the given id', async () => {
            const res = await request(server).get(`/api/tickets/${id}`).set('Authorization', token);
            expect(res.body.id).toBe(id);
            expect(res.body).toMatchObject({
                id: expect.any(Number),
                created_at: expect.any(String),
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

    describe('GET /getby/filter', () => {
        const filter = {
            category: 'Java'
        };
        test('should return 200 ok with correct credentials', async () => {
            const res = await (await request(server).get(`/api/tickets/getby/filter`).send(filter).set('Authorization', token));
            expect(res.status).toBe(200);
        })

        test('should return an array of user objects', async () => {
            const res = await request(server).get(`/api/tickets/getby/filter`).send(filter).set('Authorization', token);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body[0]).toMatchObject({
                id: expect.any(Number),
                created_at: expect.any(String),
                title: expect.any(String),
                description: expect.any(String),
                category: expect.stringContaining(filter.category),
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

    describe('GET /all/open', () => {
        test('should return 200 ok with correct credentials', async () => {
            const res = await request(server).get(`/api/tickets/all/open`).set('Authorization', token);
            expect(res.status).toBe(200);
        });

        test('should return an array of ticket objects with a resolved value of false', async () => {
            const res = await request(server).get(`/api/tickets/all/open`).set('Authorization', token);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body[0].resolved).toBe(false);
            expect(res.body[0]).toMatchObject({
                id: expect.any(Number),
                created_at: expect.stringMatching("2020-02-28 19:28:10"),
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

    describe('GET /:id/comments', () => {
        const id = 4;
        test('should return 200 ok with correct credentials', async () => {
            const res = await request(server).get(`/api/tickets/${id}/comments`).set('Authorization', token);
            expect(res.status).toBe(200);
        });

        test('should return an array of comment objects with a ticket_id that matches the given id', async () => {
            const res = await request(server).get(`/api/tickets/${id}/comments`).set('Authorization', token);
            expect(Array.isArray(res.body)).toBe(true);
            if (res.body.length > 0) {
                expect(res.body[0]).toMatchObject({
                    id: expect.any(Number),
                    role: expect.any(String),
                    username: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    comment: expect.any(String),
                    is_solution: expect.any(Boolean)
                });
            }
        });
    });

    describe('POST /, PUT /:id, DELETE /:id & POST /:id/comments', async () => {
        const res = await request(server)
            .post(`/api/tickets`)
            .send({ 
                asker_id: 1,
                title: 'testing all the things', 
                description: "How do I use Jest and Supertest to test my endpoints?", 
                category: 'Node'
            })
            .set('Authorization', token);

        test('POST should return 201 ok with correct credentials', () => {
            expect(res.status).toBe(201);
        });

        test('POST the asker id should equal the asker_id included in the request', () => {
            expect(res.body.asker.id).toBe(1);
        });

        test('POST should return the added ticket with fields matching the request', () => {
            expect(res.body).toMatchObject({
                id: expect.any(Number),
                created_at: expect.any(String),
                title: expect.stringMatching('testing all the things'),
                description: expect.stringMatching("How do I use Jest and Supertest to test my endpoints?"),
                category: expect.stringMatching('Node'),
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

        test('PUT should return 200 and return ticket with changes with correct credentials', async () => {
            const response = await request(server)
                .post(`/api/tickets/${res.body.asker.id}`)
                .send({ 
                    resolved: true
                })
                .set('Authorization', token);
            expect(response.status).toBe(200);
            expect(res.body.asker.id).toBe(1);
            expect(res.body.resolved).toBe(true);
            expect(res.body).toMatchObject({
                id: expect.any(Number),
                created_at: expect.any(String),
                title: expect.stringMatching('testing all the things'),
                description: expect.stringMatching("How do I use Jest and Supertest to test my endpoints?"),
                category: expect.stringMatching('Node'),
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
        })

        test('DELETE /:id should return 200 and the deleted ticket with correct credentials', async () => {
            const response = await request(server)
                .delete(`/api/tickets/${res.body.asker.id}`)
                .set('Authorization', token);
            expect(response.status).toBe(200);
            expect(response.body.asker.id).toBe(res.body.asker.id);
            expect(res.body).toMatchObject({
                id: expect.any(Number),
                created_at: expect.any(String),
                title: expect.stringMatching('testing all the things'),
                description: expect.stringMatching("How do I use Jest and Supertest to test my endpoints?"),
                category: expect.stringMatching('Node'),
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

    describe('POST /:id/comments', () => {
        test('POST should return the added comment with fields matching the request', async () => {
            const res = await request(server)
            .post(`/api/tickets/4/comments`)
            .send({ 
                ticket_id: 4,
                commenter_id: 1,
                comment: 'testing all the things'
            })
            .set('Authorization', token);

            expect(res.status).toBe(201);
            expect(res.body).toMatchObject({
                id: expect.any(Number),
                role: expect.any(String),
                username: expect.any(String),
                first_name: expect.any(String),
                last_name: expect.any(String),
                comment: expect.stringMatching('testing all the things'),
                is_solution: expect.any(Boolean)
            });
            comments.remove(res.body.id);
        });
    });
});