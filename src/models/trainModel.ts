import mongoose, { Schema, Document } from 'mongoose';

export interface ITrain extends Document {
  name: string;
  start_station: mongoose.Types.ObjectId;  // Reference to TrainStation
  end_station: mongoose.Types.ObjectId;    // Reference to TrainStation
  time_of_departure: Date;
}

const trainSchema: Schema = new Schema({
  name: { type: String, required: true },
  start_station: { type: Schema.Types.ObjectId, ref: 'TrainStation', required: true },
  end_station: { type: Schema.Types.ObjectId, ref: 'TrainStation', required: true },
  time_of_departure: { type: Date, required: true }
}, { timestamps: true });

export const Train = mongoose.model<ITrain>('Train', trainSchema);
