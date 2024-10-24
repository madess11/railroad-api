import mongoose, { Schema, Document } from 'mongoose';

export interface ITrain extends Document {
  name: string;
  start_station: string;
  end_station: string;
  time_of_departure: Date;
}

const trainSchema: Schema = new Schema({
  name: { type: String, required: true },
  start_station: { type: String, required: true },
  end_station: { type: String, required: true },
  time_of_departure: { type: Date, required: true }
}, { timestamps: true });

export const Train = mongoose.model<ITrain>('Train', trainSchema);
