import mongoose, { Schema, Document } from 'mongoose'

// Define the Ticket interface that extends Document
export interface ITicket extends Document {
  user: mongoose.Schema.Types.ObjectId   // Reference to the User
  train: mongoose.Schema.Types.ObjectId  // Reference to the Train
  valid: boolean                         // Indicates if the ticket is validated
  booked_at: Date                       // Timestamp for when the ticket was booked
}

// Define the ticket schema
const ticketSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
  valid: { type: Boolean, default: false },  // Default to false (not validated)
  booked_at: { type: Date, default: Date.now } // Default to the current date and time
}, { timestamps: true })

// Create the Ticket model
export const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema)
