// en este contenedor invoco los contenedores (firestore, mongodb )
import { CART_ROUT, PERSISTENCIA, RUTA } from '../config/config.js';
import { MongoDBContainer } from './MongoContainer.js';
import { FirestoreContainer } from './FirestoreContainer.js';
import { ProductsContainer } from './ProdsContainer.js';
import { CartContainer } from './CartContainer.js';

export let chosenProdsContainer;
export let chosenCartContainer;

switch (PERSISTENCIA) {
  case 'mongodb':
    chosenProdsContainer = new MongoDBContainer('products');
    chosenCartContainer = new MongoDBContainer('cart');
    break;
  case 'firestore':
    chosenProdsContainer = new FirestoreContainer('products');
    chosenCartContainer = new FirestoreContainer('cart');
    break;
  default:
    // chosenProdsContainer = new ProductsContainer(RUTA);
    // chosenCartContainer = new CartContainer(CART_ROUT);
    break;
}

