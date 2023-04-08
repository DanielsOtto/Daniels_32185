//Desafio 20 -- conectandome al cliente de MONGO

import { MongoClient } from 'mongodb';
import { MONGO_CNS_D20 } from '../config/mongodb.js';

const mongoClient = new MongoClient(MONGO_CNS_D20);

await mongoClient.connect();

export { mongoClient };