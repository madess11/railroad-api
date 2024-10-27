import { Train, ITrain } from '../models/trainModel'


interface TrainQuery {
    start_station?: string
    end_station?: string
}

export const createTrain = async (trainData: ITrain) => {
    const newTrain = new Train(trainData)
    return newTrain.save()
}

export const getTrains = async (query: TrainQuery, limit = 10) => {
    const filter = {
        ...(query.start_station && { start_station: query.start_station }),
        ...(query.end_station && { end_station: query.end_station }),
    }
    return Train.find(filter)
        .limit(limit)
        .populate('start_station')
        .populate('end_station')  // Populate station details
}

export const updateTrain = async (trainId: string, trainData: Partial<ITrain>) => {
    return Train.findByIdAndUpdate(trainId, trainData, { new: true })
        .populate('start_station')
        .populate('end_station')  // Populate updated station details
}

export const deleteTrain = async (trainId: string) => {
    return Train.findByIdAndDelete(trainId)
}
