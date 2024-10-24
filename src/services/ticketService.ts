import { Ticket } from '../models/ticketModel';
import { Train } from '../models/trainModel';

export const bookTicket = async (userId: string, trainId: string) => {
    const train = await Train.findById(trainId);
    if (!train) throw new Error('Train not found');

    const newTicket = new Ticket({ user: userId, train: trainId });
    return newTicket.save();
};

export const validateTicket = async (ticketId: string) => {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) throw new Error('Ticket not found');

    ticket.valid = true;
    return ticket.save();
};
