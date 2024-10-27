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
    const { start_station, end_station, limit = 10, sort_by, sort_order = 'asc' } = req.query;

    try {
        const query: any = {
            ...(start_station && { start_station }),
            ...(end_station && { end_station }),
        };

        // Define the sorting field and order
        const sortOptions: any = {};

        const s_by = sort_by as string

        if (s_by) {
            sortOptions[s_by] = sort_order === 'desc' ? -1 : 1;
        }

        const trains = await Train.find(query)
            .sort(sortOptions)  // Apply sorting
            .limit(Number(limit));  // Apply the limit

        res.json(trains);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching trains', error: err });
    }
};

// Get a train by ID
export const getTrain = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const train = await Train.findById(id);
        if (!train) {
            res.status(404).json({ message: 'Train not found' })
            return
        }
        res.json(train);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching train', error: err });
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
