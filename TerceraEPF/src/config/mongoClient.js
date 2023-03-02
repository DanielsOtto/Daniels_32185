import { MongoClient } from 'mongodb';
import { logger } from '../log/pino.js';
import { CNX_STR, DB_NAME } from './config.js';

const mongoClient = new MongoClient(CNX_STR);
try {
  await mongoClient.connect();
} catch (err) {
  logger.error(err.message);
  throw err;
}
export const mongoDBase = mongoClient.db(DB_NAME);
