import { MongoDBContainer } from './MongoContainer.js';
// // en este contenedor invoco los contenedores ( mongodb )
// // import { CART_ROUT, PERSISTENCIA, RUTA } from '../config/config.js';
// // // import { ProductsContainer } from './ProdsContainer.js';
// // import { CartContainer } from './CartContainer.js';

// // export let chosenProdsContainer;
// // export let chosenCartContainer;

// // switch (PERSISTENCIA) {
// //   case 'mongodb':
// //     chosenProdsContainer = new MongoDBContainer('products');
// //     chosenCartContainer = new MongoDBContainer('cart');
// //     export const chosenUsersContainers = new MongoDBContainer('user');
// //     break;
// //   default:
// //     chosenProdsContainer = new ProductsContainer(RUTA);
// //     chosenCartContainer = new CartContainer(CART_ROUT);
// //     break;
// // }




// MODIFICAR PARA Q SOLO TRABAJE CON MONGO ???
export const chosenProdsContainer = new MongoDBContainer('products');
export const chosenCartContainer = new MongoDBContainer('cart');
export const chosenUsersContainers = new MongoDBContainer('user');