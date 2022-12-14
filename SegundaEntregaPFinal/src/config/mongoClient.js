import { MongoClient } from 'mongodb.js';
import { CNX_STR, DB_NAME } from './config.js';

const mongoClient = new MongoClient(CNX_STR);
try {
  await mongoClient.connect();
} catch (error) {
  throw error;
}
export const mongoDBase = mongoClient.db(DB_NAME);
