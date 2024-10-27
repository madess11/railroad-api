import { Router } from 'express';
import { getTrains, createTrain, updateTrain, deleteTrain, getTrain } from '../controllers/trainController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const router = Router();

// Public route
router.get('/', getTrains);
router.get('/:id', getTrain);

// Admin routes (Protected)
router.post('/', [authMiddleware, roleMiddleware('admin')], createTrain);
router.put('/:id', [authMiddleware, roleMiddleware('admin')], updateTrain);
router.delete('/:id', [authMiddleware, roleMiddleware('admin')], deleteTrain);

export default router;
