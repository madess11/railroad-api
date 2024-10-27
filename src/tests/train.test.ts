import request from "supertest";
import app from "../app";

describe('Train Management', () => {
    let adminToken: string;

    beforeAll(async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'admin@example.com',
                pseudo: 'adminuser',
                password: 'adminpass',
                role: 'admin'
            });

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'admin@example.com',
                password: 'adminpass',
            });

        adminToken = response.body.token;
    });

    it('should allow admin to create a train', async () => {
        const res = await request(app)
            .post('/api/trains')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                name: 'Express Train',
                start_station: 'Paris',
                end_station: 'Lyon',
                time_of_departure: new Date().toISOString()
            });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('name', 'Express Train');
    });

    // it('should allow admin to delete a train', async () => {
    //     const train = await request(app)
    //         .post('/api/trains')
    //         .set('Authorization', `Bearer ${adminToken}`)
    //         .send({
    //             name: 'Express Train',
    //             start_station: 'Paris',
    //             end_station: 'Lyon',
    //             time_of_departure: new Date().toISOString()
    //         });
    //     const res = await request(app)
    //         .delete(`/api/trains/${train.body._id}`)
    //         .set('Authorization', `Bearer ${adminToken}`);
    //     expect(res.status).toBe(200);
    //     expect(res.body).toHaveProperty('message', 'Train deleted successfully');
    // });
});
