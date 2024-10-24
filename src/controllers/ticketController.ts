import { Request, Response } from 'express';
import { Ticket } from '../models/ticketModel';
import { Train } from '../models/trainModel';
import { AuthRequest } from '../extension/AuthRequest';

// Book a ticket
export const bookTicket = async (req: AuthRequest, res: Response) => {
    const { trainId } = req.body;
    try {
        const train = await Train.findById(trainId);
        if (!train) {
            res.status(404).json({ message: 'Train not found' })
            return
        }

        const newTicket = new Ticket({ user: req.user?.id, train: trainId });
        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (err) {
        res.status(400).json({ message: 'Error booking ticket', error: err });
    }
};

// Validate a ticket (Employee only)
export const validateTicket = async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    try {
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            res.status(404).json({ message: 'Ticket not found' });
            return
        }

        ticket.valid = true;
        await ticket.save();
        res.json({ message: 'Ticket validated successfully', ticket });
    } catch (err) {
        res.status(400).json({ message: 'Error validating ticket', error: err });
    }
};
