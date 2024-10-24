import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';

const router = Router();

// All routes are protected by adminMiddleware

// Get all users
router.get('/', authMiddleware, adminMiddleware, getAllUsers);

// Get a single user by ID
router.get('/:id', authMiddleware, adminMiddleware, getUserById);

// Create a new user
router.post('/', authMiddleware, adminMiddleware, createUser);

// Update an existing user
router.put('/:id', authMiddleware, adminMiddleware, updateUser);

// Delete a user
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

export default router;
