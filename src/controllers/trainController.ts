import { Request, Response } from 'express';
import { Train } from '../models/trainModel';

// Create a new train (Admin only)
export const createTrain = async (req: Request, res: Response) => {
    try {
        const newTrain = new Train(req.body);
        await newTrain.save();
        res.status(201).json(newTrain);
    } catch (err) {
        res.status(400).json({ message: 'Error creating train', error: err });
    }
};

// Get a list of trains
export const getTrains = async (req: Request, res: Response) => {
    const { start_station, end_station, limit = 10 } = req.query;
    try {
        const query = {
            ...(start_station && { start_station }),
            ...(end_station && { end_station }),
        };
        const trains = await Train.find(query).limit(Number(limit));
        res.json(trains);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching trains', error: err });
    }
};

// Update a train (Admin only)
export const updateTrain = async (req: Request, res: Response) => {
    try {
        const updatedTrain = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTrain);
    } catch (err) {
        res.status(400).json({ message: 'Error updating train', error: err });
    }
};

// Delete a train (Admin only)
export const deleteTrain = async (req: Request, res: Response) => {
    try {
        await Train.findByIdAndDelete(req.params.id);
        res.json({ message: 'Train deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting train', error: err });
    }
};
