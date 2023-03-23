import mongoose from 'mongoose';
import { MONGO } from '../config/config.js';
import { logger } from '../config/pino.js';

const uri = MONGO;

mongoose.set('strictQuery', false); // me daba un error de depracado sin esta opcion
export const store = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('Successfully connected to MongoDB Atlas');
    })
    .catch((err) => {
        logger.info(err);
    });