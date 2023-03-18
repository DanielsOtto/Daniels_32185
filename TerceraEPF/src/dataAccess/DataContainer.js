import { MongoDBContainer } from './MongoContainer.js';

// MODIFICAR PARA Q SOLO TRABAJE CON MONGO ???
export const chosenProdsContainer = new MongoDBContainer('products');
export const chosenCartContainer = new MongoDBContainer('cart');
export const chosenUsersContainers = new MongoDBContainer('user');