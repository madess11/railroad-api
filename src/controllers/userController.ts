import { Request, Response } from 'express';
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';


// Get all users (Admin only)
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err });
    }
};

// Get a single user by ID (Admin only)
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
             res.status(404).json({ message: 'User not found' });
             return
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user', error: err });
    }
};

// Create a new user (Admin only)
export const createUser = async (req: Request, res: Response) => {
    const { email, password, pseudo, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, pseudo, role });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error creating user', error: err });
    }
};

// Update an existing user (Admin only)
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        if (!user) {
             res.status(404).json({ message: 'User not found' });
             return
        }
        res.json({ message: 'User updated successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err });
    }
};

// Delete a user (Admin only)
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
             res.status(404).json({ message: 'User not found' });
             return
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err });
    }
};
