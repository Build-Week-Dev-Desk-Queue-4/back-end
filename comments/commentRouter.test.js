const request = require('supertest');
const server = require('../api/server');
const comments = require('../comments/commentModel');

describe('Comment router', function() {
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

    describe('PUT /:id', () => {
        test('should return 200 and changed comment', async () => {
            //create a new comment
            const res = await request(server)
            .post(`/api/tickets/4/comments`)
            .send({ 
                ticket_id: 4,
                commenter_id: 1,
                comment: 'testing all the things'
            })
            .set('Authorization', token);

            const putRes = await request(server)
            .put(`/api/comments/${res.body.id}`)
            .send({
                comment: 'testing some things'
            })
            .set('Authorization', token);

            expect(putRes.status).toBe(200);
            expect(putRes.body.id).toBe(res.body.id);
            expect(putRes.body).toMatchObject({
                id: expect.any(Number),
                role: expect.any(String),
                username: expect.any(String),
                first_name: expect.any(String),
                last_name: expect.any(String),
                comment: expect.stringMatching('testing some things'),
                is_solution: expect.any(Boolean)
            });

            //delete the comment
            comments.remove(res.body.id);
        });
    });

    describe('DELETE /:id', () => {
        test('should return 200 and deleted comment', async () => {
            //create a new comment
            const res = await request(server)
            .post(`/api/tickets/4/comments`)
            .send({ 
                ticket_id: 4,
                commenter_id: 1,
                comment: 'testing all the things'
            })
            .set('Authorization', token);

            const deleteRes = await request(server)
            .delete(`/api/comments/${res.body.id}`)
            .set('Authorization', token);

            expect(deleteRes.status).toBe(200);
            expect(deleteRes.body.id).toBe(res.body.id);
            expect(deleteRes.body).toMatchObject({
                id: expect.any(Number),
                role: expect.any(String),
                username: expect.any(String),
                first_name: expect.any(String),
                last_name: expect.any(String),
                comment: expect.stringMatching('testing all the things'),
                is_solution: expect.any(Boolean)
            });
        });
    });
});