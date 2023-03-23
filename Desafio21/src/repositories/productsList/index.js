import { ProductsList } from './ProductsList.js';

const { mongoClient } = await import('../../database/mongoClient.js');
const { DaoMongoDb } = await import('../../daos/DaoMongoDb.js');
const productsCollection = mongoClient.db().collection('products'); // elijo la coleccion
const daoMongoDb = new DaoMongoDb(productsCollection);

export const productsList = new ProductsList(daoMongoDb);