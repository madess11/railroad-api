import request from 'supertest';
import app from '../app';

describe('Ticket Booking and Validation', () => {
    let userToken: string;
    let adminToken: string;
    let trainId: string;

    beforeAll(async () => {
        // Register and login user
        const userRes = await request(app)
            .post('/api/auth/register')
            .send({ email: 'user@example.com', password: 'password', role: 'user' });
        userToken = userRes.body.token;

        // Register and login admin
        const adminRes = await request(app)
            .post('/api/auth/register')
            .send({ email: 'admin@example.com', password: 'adminpass', role: 'admin' });
        adminToken = adminRes.body.token;

        // Create a train as an admin
        const trainRes = await request(app)
            .post('/api/trains')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ name: 'Express', start_station: 'Paris', end_station: 'Lyon', time_of_departure: new Date() });
        trainId = trainRes.body._id;
    });

    it('should allow a user to book a ticket', async () => {
        const res = await request(app)
            .post('/api/tickets')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ train: trainId });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('valid', false);
    });

    it('should allow admin to validate a ticket', async () => {
        const ticketRes = await request(app)
            .post('/api/tickets')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ train: trainId });
        const ticketId = ticketRes.body._id;

        const res = await request(app)
            .put(`/api/tickets/${ticketId}/validate`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('valid', true);
    });
});
