import { TrainStation } from '../models/trainStationModel';

export const createStation = async (stationData: any) => {
    const newStation = new TrainStation(stationData);
    return newStation.save();
};

export const getStations = async () => {
    return TrainStation.find().sort('name');
};

export const updateStation = async (stationId: string, stationData: any) => {
    return TrainStation.findByIdAndUpdate(stationId, stationData, { new: true });
};

export const deleteStation = async (stationId: string) => {
    return TrainStation.findByIdAndDelete(stationId);
};
