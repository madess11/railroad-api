import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../models/userModel';

export const registerUser = async (email: string, password: string, pseudo: string, role: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, pseudo, role });
    return newUser.save();
};

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return { token, user };
};

export const getUserProfile = async (userId: string) => {
    return User.findById(userId).select('-password');
};
