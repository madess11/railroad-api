import { Ticket } from '../models/ticketModel';
import { ITicket } from '../models/ticketModel';

// Create a new ticket
export const createTicket = async (ticketData:  any) => {
    const newTicket = new Ticket(ticketData);
    return newTicket.save();
};

// Get all tickets for a specific user
export const getUserTickets = async (userId: string) => {
    return Ticket.find({ user: userId }).populate('train');  // Populate train data
};

// Validate a ticket by its ID
export const validateTicket = async (ticketId: string) => {
    return Ticket.findByIdAndUpdate(ticketId, { valid: true }, { new: true });
};
