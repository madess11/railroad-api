import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  pseudo: string;
  password: string;
  role: 'user' | 'employee' | 'admin';
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  pseudo: { type: String, required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'employee', 'admin'], 
    default: 'user' 
  }
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
