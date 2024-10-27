import { Request, Response } from 'express'
import { Train } from '../models/trainModel'
import { ITrain } from '../models/trainModel'

// Create a new train (Admin only)
export const createTrain = async (req: Request, res: Response) => {
    try {
        const newTrain = new Train(req.body as ITrain)
        await newTrain.save()
        res.status(201).json(newTrain)
    } catch (err) {
        res.status(400).json({ message: 'Error creating train', error: err })
    }
}

// Get a list of trains with filtering, sorting, and pagination
export const getTrains = async (req: Request, res: Response) => {
    const { start_station, end_station, limit = '10', sort_by, sort_order = 'asc' } = req.query
    const parsedLimit = parseInt(limit as string, 10) || 10

    try {
        const query = {
            ...(start_station && { start_station: start_station as string }),
            ...(end_station && { end_station: end_station as string }),
        }

        // Define sorting field and order
        const sortOptions: Record<string, 1 | -1> = {}
        if (sort_by) {
            sortOptions[sort_by as string] = sort_order === 'desc' ? -1 : 1
        }

        const trains = await Train.find(query)
            .sort(sortOptions)
            .limit(parsedLimit)
            .populate('start_station')
            .populate('end_station') // Populate station details

        res.json(trains)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching trains', error: err })
    }
}

// Get a train by ID
export const getTrain = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const train = await Train.findById(id).populate('start_station').populate('end_station')
        if (!train) {
            res.status(404).json({ message: 'Train not found' })
            return
        }
        res.json(train)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching train', error: err })
    }
}

// Update a train (Admin only)
export const updateTrain = async (req: Request, res: Response) => {
    try {
        const updatedTrain = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('start_station')
            .populate('end_station') // Populate updated station details
        if (!updatedTrain) {
            res.status(404).json({ message: 'Train not found' })
            return
        }
        res.json(updatedTrain)
    } catch (err) {
        res.status(400).json({ message: 'Error updating train', error: err })
    }
}

// Delete a train (Admin only)
export const deleteTrain = async (req: Request, res: Response) => {
    try {
        const deletedTrain = await Train.findByIdAndDelete(req.params.id)
        if (!deletedTrain) {
            res.status(404).json({ message: 'Train not found' })
            return
        }
        res.json({ message: 'Train deleted successfully' })
    } catch (err) {
        res.status(400).json({ message: 'Error deleting train', error: err })
    }
}
