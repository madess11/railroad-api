import Joi from 'joi';

// Schema for user validation
export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  pseudo: Joi.string().min(3).max(30).required(),
  role: Joi.string().valid('user', 'admin', 'employee').default('user'),
});

// Schema for train validation
export const trainSchema = Joi.object({
  name: Joi.string().min(1).required(),
  start_station: Joi.string().min(1).required(),
  end_station: Joi.string().min(1).required(),
  time_of_departure: Joi.date().required(),
});

// Schema for train station validation
export const stationSchema = Joi.object({
  name: Joi.string().min(1).required(),
  open_hour: Joi.string().regex(/^\d{2}:\d{2}$/).required(),  // Matches "HH:MM" format
  close_hour: Joi.string().regex(/^\d{2}:\d{2}$/).required(),
  image: Joi.string().optional(),  // Image will be handled separately
});

// Schema for ticket booking validation
export const ticketSchema = Joi.object({
  userId: Joi.string().required(),
  trainId: Joi.string().required(),
  stationId: Joi.string().required(),
  bookingTime: Joi.date().default(Date.now),
});
