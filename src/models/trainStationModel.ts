import mongoose, { Schema, Document } from 'mongoose'

export interface ITrainStation extends Document {
  name: string
  open_hour: string  // HH:mm format
  close_hour: string // HH:mm format
  image: string      // URL to the station image
}

const trainStationSchema: Schema = new Schema({
  name: { type: String, required: true },
  open_hour: { type: String, required: true },
  close_hour: { type: String, required: true },
  image: { type: String, required: true }
}, { timestamps: true })

export const TrainStation = mongoose.model<ITrainStation>('TrainStation', trainStationSchema)
