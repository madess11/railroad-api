import mongoose, { Schema, Document } from 'mongoose';

export interface ITicket extends Document {
  user: mongoose.Schema.Types.ObjectId;   // Reference to the User
  train: mongoose.Schema.Types.ObjectId;  // Reference to the Train
  valid: boolean;                        // Indicates if the ticket is validated
  booked_at: Date;
}

const ticketSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
  valid: { type: Boolean, default: false },
  booked_at: { type: Date, default: Date.now }
}, { timestamps: true });

export const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema);
