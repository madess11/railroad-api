import { Router } from 'express';
import { getStations, createStation, updateStation, deleteStation, getStationById } from '../controllers/stationController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const router = Router();

// Public route
router.get('/', getStations);
router.get('/:id', getStationById);


// Admin routes (Protected)
router.post('/', [authMiddleware, roleMiddleware('admin')], createStation);
router.put('/:id', [authMiddleware, roleMiddleware('admin')], updateStation);
router.delete('/:id', [authMiddleware, roleMiddleware('admin')], deleteStation);

export default router;
