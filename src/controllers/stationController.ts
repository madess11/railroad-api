import { Request, Response } from 'express';
import { TrainStation } from '../models/trainStationModel';
import { getAll, updateS, deleteSt, upload, MulterRequest } from '../services/stationService';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import Joi from 'joi';

// Define the schema for validation
const stationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    open_hour: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(), // HH:mm format
    close_hour: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required() // HH:mm format
})

// Helper function to resize and save images
const resizeImage = async (filePath: string) => {
    const outputFilePath = path.resolve('uploads', 'resized', path.basename(filePath));
    await sharp(filePath)
        .resize(200, 200)
        .toFile(outputFilePath);
    fs.unlinkSync(filePath); // Remove original file
    return outputFilePath;
};


// Get a station by ID (Public)
export const getStationById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const station = await TrainStation.findById(id);
        if (!station) {
            res.status(404).json({ message: 'Station not found' });
            return
        }
        res.json(station);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching station', error: err });
    }
};



// Create a new station
export const createStation = async (req: Request, res: Response) => {
    upload(req, res, async (err) => {
        if (err) {
            res.status(400).json({ message: 'File upload failed', error: err })
            return
        }

        // Validate request body
        const { error } = stationSchema.validate(req.body)
        if (error) {
            res.status(400).json({ message: 'Validation error', details: error.details })
            return
        }

        const { name, open_hour, close_hour } = req.body

        try {
            // Resize image if provided
            let imagePath = ''
            if (req.file) {
                const resizedPath = `uploads/resized/${Date.now()}_${req.file.originalname}`
                await sharp(req.file.buffer)
                    .resize(200, 200)
                    .toFile(resizedPath)
                imagePath = resizedPath
            }

            const newStation = new TrainStation({
                name,
                open_hour,
                close_hour,
                image: imagePath,
            })

            await newStation.save()
            res.status(201).json(newStation)
        } catch (err) {
            res.status(400).json({ message: 'Error creating station', error: err })
        }
    })
}



// Get a list of stations
export const getStations = async (req: Request, res: Response) => {
    try {
        const stations = await getAll();
        res.json(stations);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching stations', error: err });
    }
};

// Update a station (Admin only)
export const updateStation = async (req: Request, res: Response) => {
    try {
        let stationData = req.body;

        // Resize image if updated
        if (req.file) {
            stationData.image = await resizeImage(req.file.path);
        }

        const updatedStation = await updateS(req.params.id, stationData);
        res.json(updatedStation);
    } catch (err) {
        res.status(400).json({ message: 'Error updating station', error: err });
    }
};

// Delete a station (Admin only)
export const deleteStation = async (req: Request, res: Response) => {
    try {
        await deleteSt(req.params.id);
        res.json({ message: 'Station deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting station', error: err });
    }
};
