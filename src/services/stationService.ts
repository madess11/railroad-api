
import { Request, Response } from 'express';
import multer from 'multer';
import { TrainStation } from '../models/trainStationModel';
import { Train } from '../models/trainModel';
import fs from 'fs';
import path from 'path';


// Extend Request type to include file
export interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

export const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    },
}).single('image'); // 'image' is the field name for file uploads





// Get all train stations, sorted by name
export const getAll = async () => {
    return TrainStation.find().sort('name');
};

// Update a train station with optional image update
export const updateS = async (stationId: string, stationData: any) => {
    if (stationData.image) {
        const station = await TrainStation.findById(stationId);
        if (station?.image) {
            fs.unlinkSync(path.resolve(station.image));  // Remove old image file
        }
    }
    return TrainStation.findByIdAndUpdate(stationId, stationData, { new: true });
};

// Delete a train station with check for related trains
export const deleteSt = async (stationId: string) => {
    // Check for any trains that reference this station
    const linkedTrains = await Train.find({
        $or: [{ start_station: stationId }, { end_station: stationId }]
    });

    if (linkedTrains.length > 0) {
        throw new Error('Cannot delete station: trains are linked to this station.');
    }

    // Delete the station
    const station = await TrainStation.findByIdAndDelete(stationId);

    // Remove image file if it exists
    if (station?.image) {
        fs.unlinkSync(path.resolve(station.image));
    }

    return station;
};



