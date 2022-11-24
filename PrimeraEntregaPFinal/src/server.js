import express from 'express';
import routerApiProducts from './routers/routerApiProducts.js';
import routerApiCart from './routers/routerApiCart.js';
import { notFound } from './controllers/controllersCart.js';
const app = express();
app.set('port', process.env.PORT || 8080);

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//RUTAS
app.use('/api/products', routerApiProducts);
app.use('/api/shoppingcart', routerApiCart);
app.all('*', notFound);

app.listen(app.get('port'), (req, res) => {
  try {
    console.log(`El servidor esta levantado en el puerto ${app.get('port')}`)
  } catch (error) {
    throw new Error('Error al levantar el servidor');
  }
});