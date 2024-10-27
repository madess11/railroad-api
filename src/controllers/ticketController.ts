import { Request, Response } from 'express';
import { createTicket, getUserTickets, validateTicket } from '../services/ticketService';
import { AuthRequest } from '../extension/AuthRequest';
import { ITicket } from '../models/ticketModel';

// Create a new ticket
export const bookTicket = async (req: AuthRequest, res: Response) => {
    try {
        const ticketData = {
            user: req.user!.id,  // Assuming user ID is attached to req.user
            train: req.body.train,
            valid: false,         // Initial state as not valid
        };
        const newTicket = await createTicket(ticketData);
        res.status(201).json(newTicket);
    } catch (err) {
        res.status(400).json({ message: 'Error booking ticket', error: err });
    }
};

// Get all tickets for a user
export const getTickets = async (req: AuthRequest, res: Response) => {
    try {
        const tickets = await getUserTickets(req.user!.id);
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tickets', error: err });
    }
};

// Validate a ticket
export const validateUserTicket = async (req: Request, res: Response) => {

    const { id } = req.params;
    
    try {
        const validatedTicket = await validateTicket(id);
        if (!validatedTicket) {
            res.status(404).json({ message: 'Ticket not found' });
            return
        }
        res.json(validatedTicket);
    } catch (err) {
        res.status(400).json({ message: 'Error validating ticket', error: err });
    }
};
