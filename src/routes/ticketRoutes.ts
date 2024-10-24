import { Router } from 'express';
import { bookTicket, validateTicket } from '../controllers/ticketController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const router = Router();

// User route
router.post('/book/:trainId', authMiddleware, bookTicket);

// Employee route (Protected)
router.post('/validate/:ticketId', [authMiddleware, roleMiddleware('employee')], validateTicket);

export default router;
