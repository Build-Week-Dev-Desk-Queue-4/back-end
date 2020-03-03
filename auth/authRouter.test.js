const request = require('supertest');
const server = require('../api/server');
const users = require('../users/userModel');

describe('Auth router', function() {
    test('should run the test', function() {
        expect(true).toBe(true);
    })

    describe('POST /api/auth/', () => {
        test('/register should return 201 with user and token', async () => {
            const username = 'testuserauth';
            const res = await request(server)
                .post('/api/auth/register')
                .send({ 
                    username: username, 
                    password: "password", 
                    role: 'student',
                    first_name: 'Testy',
                    last_name: 'McTest',
                    email: 'a@b.com'
                });
            const id = res.body.user.id;
            expect(res.status).toBe(201);
            expect(res.body).toMatchObject({
                // 'id', 'username', 'role', 'first_name', 'last_name', 'email'
            user: expect.objectContaining({
                id: expect.any(Number),
                username: expect.stringMatching(username),
                role: expect.stringMatching('student'),
                first_name: expect.stringMatching('Testy'),
                last_name: expect.stringMatching('McTest'),
                email: expect.stringMatching('a@b.com')
            }),
            token: expect.any(String),
            });
            //delete the newly registered user
            await users.remove(id);
        });

        test('/login should return a 200 with a message and token', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({ username: 'showmethemoney', password: 'showmethemoney' });
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({
                message: expect.stringMatching('Welcome back, showmethemoney'),
                token: expect.any(String)
            });
        });
    });
});