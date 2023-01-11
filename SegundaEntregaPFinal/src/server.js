import express from 'express';
import routerApiCart from './routers/routerApiCarts.js';
import routerApiProds from './routers/routerApiProducts.js';
export const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//RUTAS
app.use('/api/products', routerApiProds);
app.use('/api/shoppingcart', routerApiCart);

// app.all('*',);

