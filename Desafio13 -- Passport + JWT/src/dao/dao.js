import mongoose from 'mongoose';
import { MONGO } from '../config/config.js';

const uri = MONGO;

mongoose.set('strictQuery', false); // me daba un error de depracado sin esta opcion
export const store = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.log(err);
    });