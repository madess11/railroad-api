import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import { AuthRequest } from '../extension/AuthRequest';

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
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

// Login a user
export const loginUser = async (req: AuthRequest, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
             res.status(401).json({ message: 'Invalid credentials' });
             return
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '24h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err });
    }
};

// Get user profile
export const getUserProfile = async (req: AuthRequest, res: Response) =>  {
    try {
        const user = await User.findById(req.user?.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(404).json({ message: 'User not found' });
    }
};
