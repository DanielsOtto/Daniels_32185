import express from 'express';
export const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//RUTAS
// app.use('/api/products',);
// app.use('/api/shoppingcart',);  faltan los middleware
// app.all('*',);