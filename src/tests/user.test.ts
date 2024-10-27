import request from 'supertest';
import app from '../app';
import { clearDatabase, closeDatabase, connect } from '../configs/jest.setup';
// import { connect, closeDatabase, clearDatabase } from './jest.setup';

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());



describe('User Management', () => {
    it('should register a new user', async () => {

        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                pseudo: 'testuser',
                password: 'password123',
                role: 'user'
            })

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("message", "User created successfully");
    });

    it('should authenticate a user', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                pseudo: 'testuser',
                password: 'password123'
            });
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("token",);

    });
});
