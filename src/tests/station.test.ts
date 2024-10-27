import request from 'supertest'
import app from '../app'  
import { TrainStation } from '../models/trainStationModel'
import { clearDatabase, closeDatabase, connect } from '../configs/jest.setup'


beforeAll(async () => await connect())
afterEach(async () => await clearDatabase())
afterAll(async () => await closeDatabase())

describe('Station Management', () => {
  

    // Test for fetching all stations
    it('should fetch all stations', async () => {
        await TrainStation.create([
            { name: 'Station A', open_hour: '08:00', close_hour: '20:00', image: 'stationA.jpg' },
            { name: 'Station B', open_hour: '09:00', close_hour: '21:00', image: 'stationB.jpg' },
        ])

        const response = await request(app).get('/api/stations')
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(2)
    })
})
