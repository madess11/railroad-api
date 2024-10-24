import { Request, Response } from 'express';
import {TrainStation} from '../models/trainStationModel';

// Create a new station (Admin only)
export const createStation = async (req: Request, res: Response) => {
    try {
        const newStation = new TrainStation(req.body);
        await newStation.save();
        res.status(201).json(newStation);
    } catch (err) {
        res.status(400).json({ message: 'Error creating station', error: err });
    }
};

// Get a list of stations
export const getStations = async (req: Request, res: Response) => {
    try {
        const stations = await TrainStation.find().sort('name');
        res.json(stations);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching stations', error: err });
    }
};

// Update a station (Admin only)
export const updateStation = async (req: Request, res: Response) => {
    try {
        const updatedStation = await TrainStation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedStation);
    } catch (err) {
        res.status(400).json({ message: 'Error updating station', error: err });
    }
};

// Delete a station (Admin only)
export const deleteStation = async (req: Request, res: Response) => {
    try {
        await TrainStation.findByIdAndDelete(req.params.id);
        res.json({ message: 'Station deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting station', error: err });
    }
};
