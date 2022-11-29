import express from 'express';
import routerApiProducts from './routers/routerApiProducts.js';
import { engine } from 'express-handlebars';
import routerApiMessages from './routers/routerApiMessages.js';
export const app = express();


//configuracion handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//rutas
app.use('/api/products', routerApiProducts);
app.use('/api/messages', routerApiMessages);



