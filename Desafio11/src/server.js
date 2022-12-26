import express from 'express';
import routerApiProducts from './routers/routerApiProducts.js';
import { engine } from 'express-handlebars';
import routerApiMessages from './routers/routerApiMessages.js';
import routerApiTest from './routers/routerApiTest.js';
export const app = express();


//configuracion handlebars
// app.engine('handlebars', engine());
// app.set('view engine', 'public');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//rutas
app.use('/api/products', routerApiProducts);
app.use('/api/messages', routerApiMessages);
app.use('/api/productos-test', routerApiTest);
/* crear una vista en forma de tabla que consuma desde esta ruta 
una lista con 5 productos generados al azar utilizando Faker.js, como generador
de informacion aleatoria de test (en vez de tomarse de una bbdd).
Elegir apropiadamente los temas, ver API
*/

