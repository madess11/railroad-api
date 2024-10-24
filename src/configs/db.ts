import mongoose from 'mongoose';
import { MONGO_URI } from './env';

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI );
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};
