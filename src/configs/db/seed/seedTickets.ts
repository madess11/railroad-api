import { Ticket } from '../../../models/ticketModel'
const tickets = [
    { "user": "603d2a57e4a120001f8e4abc", "train": "603d2a57e4a120001f8e4aef", "valid": false, "booked_at": "2024-01-01T10:00:00Z" },
    { "user": "603d2a57e4a120001f8e4abd", "train": "603d2a57e4a120001f8e4b00", "valid": true, "booked_at": "2024-01-01T11:00:00Z" },
    { "user": "603d2a57e4a120001f8e4abe", "train": "603d2a57e4a120001f8e4b01", "valid": false, "booked_at": "2024-01-01T12:00:00Z" },
    { "user": "603d2a57e4a120001f8e4abf", "train": "603d2a57e4a120001f8e4b02", "valid": true, "booked_at": "2024-01-01T13:00:00Z" },
    { "user": "603d2a57e4a120001f8e4ac0", "train": "603d2a57e4a120001f8e4b03", "valid": false, "booked_at": "2024-01-01T14:00:00Z" },
    { "user": "603d2a57e4a120001f8e4ac1", "train": "603d2a57e4a120001f8e4b04", "valid": true, "booked_at": "2024-01-01T15:00:00Z" },
    { "user": "603d2a57e4a120001f8e4ac2", "train": "603d2a57e4a120001f8e4b05", "valid": false, "booked_at": "2024-01-01T16:00:00Z" },
    { "user": "603d2a57e4a120001f8e4ac3", "train": "603d2a57e4a120001f8e4b06", "valid": true, "booked_at": "2024-01-01T17:00:00Z" },
    { "user": "603d2a57e4a120001f8e4ac4", "train": "603d2a57e4a120001f8e4b07", "valid": false, "booked_at": "2024-01-01T18:00:00Z" },
    { "user": "603d2a57e4a120001f8e4ac5", "train": "603d2a57e4a120001f8e4b08", "valid": true, "booked_at": "2024-01-01T19:00:00Z" },
    { "user": "603d2a57e4a120001f8e4ac6", "train": "603d2a57e4a120001f8e4b09", "valid": false, "booked_at": "2024-01-01T20:00:00Z" },
    { "user": "603d2a57e4a120001f8e4ac7", "train": "603d2a57e4a120001f8e4b0a", "valid": true, "booked_at": "2024-01-01T21:00:00Z" },
    { "user": "603d2a57e4a120001f8e4ac8", "train": "603d2a57e4a120001f8e4b0b", "valid": false, "booked_at": "2024-01-01T22:00:00Z" },
    { "user": "603d2a57e4a120001f8e4ac9", "train": "603d2a57e4a120001f8e4b0c", "valid": true, "booked_at": "2024-01-01T23:00:00Z" },
    { "user": "603d2a57e4a120001f8e4aca", "train": "603d2a57e4a120001f8e4b0d", "valid": false, "booked_at": "2024-01-02T10:00:00Z" },
    { "user": "603d2a57e4a120001f8e4acb", "train": "603d2a57e4a120001f8e4b0e", "valid": true, "booked_at": "2024-01-02T11:00:00Z" },
    { "user": "603d2a57e4a120001f8e4acc", "train": "603d2a57e4a120001f8e4b0f", "valid": false, "booked_at": "2024-01-02T12:00:00Z" },
    { "user": "603d2a57e4a120001f8e4acd", "train": "603d2a57e4a120001f8e4b10", "valid": true, "booked_at": "2024-01-02T13:00:00Z" },
    { "user": "603d2a57e4a120001f8e4ace", "train": "603d2a57e4a120001f8e4b11", "valid": false, "booked_at": "2024-01-02T14:00:00Z" },
    { "user": "603d2a57e4a120001f8e4acf", "train": "603d2a57e4a120001f8e4b12", "valid": true, "booked_at": "2024-01-02T15:00:00Z" }
]


export const seedTickets = async () => {
    try {
        await Ticket.deleteMany({}) // Clear the collection before seeding

        await Ticket.insertMany(tickets) // Insert the fixtures
        console.log('Tickets seeded successfully')
    } catch (err) {
        console.error('Error seeding database:', err)
    }
}