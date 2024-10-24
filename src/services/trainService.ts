import {Train} from '../models/trainModel';

export const createTrain = async (trainData: any) => {
    const newTrain = new Train(trainData);
    return newTrain.save();
};

export const getTrains = async (query: any, limit: number) => {
    const filter = {
        ...(query.start_station && { start_station: query.start_station }),
        ...(query.end_station && { end_station: query.end_station }),
    };
    return Train.find(filter).limit(limit);
};

export const updateTrain = async (trainId: string, trainData: any) => {
    return Train.findByIdAndUpdate(trainId, trainData, { new: true });
};

export const deleteTrain = async (trainId: string) => {
    return Train.findByIdAndDelete(trainId);
};
