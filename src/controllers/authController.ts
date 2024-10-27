import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import { User } from '../models/userModel'
import { AuthRequest } from '../extension/AuthRequest'

// Define the Joi schema for user login
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    })
})
// Define the schema for validation
const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    pseudo: Joi.string().min(3).required(),
    role: Joi.string().valid('user', 'admin', "employee").required() 
})

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
    const { error } = registerSchema.validate(req.body)
    if (error) {
        res.status(400).json({ message: 'Validation error', details: error.details })
        return
    }

    const { email, password, pseudo, role } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ email, password: hashedPassword, pseudo, role })
        await newUser.save()
        res.status(201).json({ message: 'User created successfully' })
    } catch (err) {
        res.status(400).json({ message: 'Error creating user', error: err })
    }
}



// Login a user
export const loginUser = async (req: Request, res: Response) => {
    // Validate the request body against the Joi schema
    const { error } = loginSchema.validate(req.body)
    if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
    }

    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ message: 'Invalid credentials' })
            return
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '24h' })
        res.json({ token })
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err })
    }
}


// Get user profile
export const getUserProfile = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user?.id).select('-password')
        res.json(user)
    } catch (err) {
        res.status(404).json({ message: 'User not found' })
    }
}
