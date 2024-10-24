import { Router } from 'express';
import { getStations, createStation, updateStation, deleteStation } from '../controllers/stationController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const router = Router();

// Public route
router.get('/', getStations);

// Admin routes (Protected)
router.post('/', [authMiddleware, roleMiddleware('admin')], createStation);
router.put('/:id', [authMiddleware, roleMiddleware('admin')], updateStation);
router.delete('/:id', [authMiddleware, roleMiddleware('admin')], deleteStation);

export default router;
