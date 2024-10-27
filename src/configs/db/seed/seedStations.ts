import mongoose from 'mongoose'
import { TrainStation } from '../../../models/trainStationModel'
import { Train } from '../../../models/trainModel'

const stations = [
    { "_id": "649f5f5005b01c1e1d3c9f50", "name": "Central Station", "open_hour": "05:00", "close_hour": "23:00", "image": "central_station.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f51", "name": "North Terminal", "open_hour": "06:00", "close_hour": "22:00", "image": "north_terminal.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f52", "name": "East Station", "open_hour": "05:30", "close_hour": "21:30", "image": "east_station.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f53", "name": "West Junction", "open_hour": "07:00", "close_hour": "20:00", "image": "west_junction.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f54", "name": "South Park Station", "open_hour": "04:30", "close_hour": "22:30", "image": "south_park_station.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f55", "name": "City Center Station", "open_hour": "05:15", "close_hour": "23:45", "image": "city_center_station.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f56", "name": "Harbor Station", "open_hour": "06:00", "close_hour": "22:00", "image": "harbor_station.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f57", "name": "Suburban Station", "open_hour": "05:45", "close_hour": "21:15", "image": "suburban_station.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f58", "name": "Airport Terminal", "open_hour": "24:00", "close_hour": "24:00", "image": "airport_terminal.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f59", "name": "Old Town Station", "open_hour": "06:00", "close_hour": "20:00", "image": "old_town_station.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f5a", "name": "Main Street Station", "open_hour": "05:00", "close_hour": "23:00", "image": "main_street_station.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f5b", "name": "Grand Station", "open_hour": "04:30", "close_hour": "22:30", "image": "grand_station.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f5c", "name": "Downtown Station", "open_hour": "05:00", "close_hour": "22:00", "image": "downtown_station.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f5d", "name": "Festival Station", "open_hour": "07:00", "close_hour": "20:00", "image": "festival_station.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f5e", "name": "Hilltop Station", "open_hour": "05:30", "close_hour": "21:00", "image": "hilltop_station.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f5f", "name": "Valley Station", "open_hour": "05:00", "close_hour": "23:00", "image": "valley_station.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f60", "name": "Riverside Station", "open_hour": "06:00", "close_hour": "22:00", "image": "riverside_station.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f61", "name": "Coastal Station", "open_hour": "05:45", "close_hour": "21:15", "image": "coastal_station.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f62", "name": "Civic Center Station", "open_hour": "06:00", "close_hour": "22:00", "image": "civic_center_station.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f63", "name": "Tech Park Station", "open_hour": "05:30", "close_hour": "21:30", "image": "tech_park_station.jpg" },
    { "_id": "649f5f5005b01c1e1d3c9f64", "name": "Meadow Station", "open_hour": "07:00", "close_hour": "20:00", "image": "meadow_station.jpg" }
]

const trains = [
    { "name": "Express Train A", "start_station": "649f5f5005b01c1e1d3c9f50", "end_station": "649f5f5005b01c1e1d3c9f51", "time_of_departure": "2024-10-01T10:00:00Z" },
    { "name": "Local Train B", "start_station": "649f5f5005b01c1e1d3c9f52", "end_station": "649f5f5005b01c1e1d3c9f53", "time_of_departure": "2024-10-01T11:00:00Z" },
    { "name": "Intercity Train C", "start_station": "649f5f5005b01c1e1d3c9f54", "end_station": "649f5f5005b01c1e1d3c9f55", "time_of_departure": "2024-10-01T12:00:00Z" },
    { "name": "Regional Train D", "start_station": "649f5f5005b01c1e1d3c9f56", "end_station": "649f5f5005b01c1e1d3c9f57", "time_of_departure": "2024-10-01T13:00:00Z" },
    { "name": "Fast Train E", "start_station": "649f5f5005b01c1e1d3c9f58", "end_station": "649f5f5005b01c1e1d3c9f59", "time_of_departure": "2024-10-01T14:00:00Z" },
    { "name": "Night Train F", "start_station": "649f5f5005b01c1e1d3c9f5a", "end_station": "649f5f5005b01c1e1d3c9f5b", "time_of_departure": "2024-10-01T15:00:00Z" },
    { "name": "Scenic Train G", "start_station": "649f5f5005b01c1e1d3c9f5c", "end_station": "649f5f5005b01c1e1d3c9f5d", "time_of_departure": "2024-10-01T16:00:00Z" },
    { "name": "Commuter Train H", "start_station": "649f5f5005b01c1e1d3c9f5e", "end_station": "649f5f5005b01c1e1d3c9f5f", "time_of_departure": "2024-10-01T17:00:00Z" },
    { "name": "Luxury Train I", "start_station": "649f5f5005b01c1e1d3c9f60", "end_station": "649f5f5005b01c1e1d3c9f61", "time_of_departure": "2024-10-01T18:00:00Z" },
    { "name": "Suburban Train J", "start_station": "649f5f5005b01c1e1d3c9f62", "end_station": "649f5f5005b01c1e1d3c9f63", "time_of_departure": "2024-10-01T19:00:00Z" },
    { "name": "Cargo Train K", "start_station": "649f5f5005b01c1e1d3c9f64", "end_station": "649f5f5005b01c1e1d3c9f50", "time_of_departure": "2024-10-01T20:00:00Z" },
    { "name": "Express Train L", "start_station": "649f5f5005b01c1e1d3c9f51", "end_station": "649f5f5005b01c1e1d3c9f52", "time_of_departure": "2024-10-01T21:00:00Z" },
    { "name": "Local Train M", "start_station": "649f5f5005b01c1e1d3c9f53", "end_station": "649f5f5005b01c1e1d3c9f54", "time_of_departure": "2024-10-01T22:00:00Z" },
    { "name": "Intercity Train N", "start_station": "649f5f5005b01c1e1d3c9f55", "end_station": "649f5f5005b01c1e1d3c9f56", "time_of_departure": "2024-10-01T23:00:00Z" },
    { "name": "Regional Train O", "start_station": "649f5f5005b01c1e1d3c9f57", "end_station": "649f5f5005b01c1e1d3c9f58", "time_of_departure": "2024-10-02T00:00:00Z" },
    { "name": "Fast Train P", "start_station": "649f5f5005b01c1e1d3c9f59", "end_station": "649f5f5005b01c1e1d3c9f5a", "time_of_departure": "2024-10-02T01:00:00Z" },
    { "name": "Night Train Q", "start_station": "649f5f5005b01c1e1d3c9f5b", "end_station": "649f5f5005b01c1e1d3c9f5c", "time_of_departure": "2024-10-02T02:00:00Z" },
    { "name": "Scenic Train R", "start_station": "649f5f5005b01c1e1d3c9f5d", "end_station": "649f5f5005b01c1e1d3c9f5e", "time_of_departure": "2024-10-02T03:00:00Z" },
    { "name": "Commuter Train S", "start_station": "649f5f5005b01c1e1d3c9f5f", "end_station": "649f5f5005b01c1e1d3c9f60", "time_of_departure": "2024-10-02T04:00:00Z" }
]




export const seedStationsAndTrains = async () => {
    try {

        await TrainStation.deleteMany({}) // Clear the collection before seeding
        await Train.deleteMany({}) // Clear the train collection before seeding

        const savedStations = await TrainStation.insertMany(stations) // Insert the fixtures
        console.log('Train Stations seeded successfully')
           
        await Train.insertMany(trains) // Insert the updated train fixtures
        console.log('Trains seeded successfully')
    } catch (err) {
        console.error('Error seeding database:', err)
    } 
}