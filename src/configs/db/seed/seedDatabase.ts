import mongoose from 'mongoose'
import { seedUsers } from './seedUsers'
import { MONGO_URI } from '../../env'
import { seedStationsAndTrains } from './seedStations'
import { seedTickets } from './seedTickets'

const seedAll = async () => {
    try {
        await mongoose.connect(MONGO_URI)

        console.log('Seeding Users...')
        await seedUsers()

        console.log('Seeding Stations and Trains...')
        await seedStationsAndTrains() // Call the station seeding function

           console.log('Seeding Tickets...')
        await seedTickets() // Call the ticket seeding function

        console.log('All seeds executed successfully!')
    } catch (err) {
        console.error('Error seeding database:', err)
    } finally {
        await mongoose.disconnect() // Disconnect from the database
    }
}

seedAll()
