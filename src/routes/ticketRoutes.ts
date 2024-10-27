import { Router } from 'express';
import { bookTicket, getTickets, validateUserTicket,    } from '../controllers/ticketController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { getUserTickets } from '../services/ticketService';

const router = Router();

// Public route to book a ticket
router.post('/', authMiddleware, bookTicket);

// Protected route to get user tickets
router.get('/', authMiddleware, getTickets);

// Admin route to validate a ticket by ID
router.put('/:id/validate', authMiddleware, validateUserTicket);

export default router;
