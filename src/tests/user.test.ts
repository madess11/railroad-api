import request from 'supertest'
import app from '../app'
import { clearDatabase, closeDatabase, connect } from '../configs/jest.setup'

beforeAll(async () => await connect())
afterEach(async () => await clearDatabase())
afterAll(async () => await closeDatabase())



describe('User Management', () => {
    it('should register a new user', async () => {

        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                pseudo: 'testusero',
                password: 'password123',
                role: 'user'
            })

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty("message", "User created successfully")
    })

})
