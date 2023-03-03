import express from 'express';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import morgan from 'morgan';

import { CNX_sessions, SESSION_CODE } from '../config/config.js';
import routerApiProds from '../routers/routerApiProducts.js';
import valAuthenticate from '../middlewares/authLogin.js';
import passport_config from '../utils/passport-local.js';
import routerApiCart from '../routers/routerApiCarts.js';
import routerApiUser from '../routers/routerUser.js';
import routerApiLogs from '../routers/routerLogs.js';
import notFound from '../middlewares/notFound.js';
import { logger } from '../log/pino.js';


passport_config();

export default class Server {
  #app;
  #server;
  constructor() {
    this.#app = express();

    // MIDDLEWARES
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(morgan('dev'));//nos muestra mensajes en consola de los metodos usados

    this.#app.use(session({ //
      secret: SESSION_CODE,
      resave: false, // cuando es true, en cada peticion, aunque la session no haya sido modificada siempre se va a guardar 
      saveUninitialized: false, //cuando es true, si inicializamos una sesion en una peticion y no guardamos nada, igual se va a guardar
      store: new MongoStore({ mongoUrl: CNX_sessions })
    }));

    this.#app.use(passport.initialize());
    this.#app.use(passport.session());

    //RUTAS
    // web
    this.#app.use('/api/products', routerApiProds);
    this.#app.use('/api/shoppingcartproducts', valAuthenticate, routerApiCart);
    this.#app.use('/api/', routerApiUser);
    this.#app.use('/', routerApiLogs); // creo q esta terminado

    this.#app.all('*', notFound);
  }

  async connect({ puerto = 0 }) {
    return new Promise((resolve, reject) => {
      this.#server = this.#app.listen(puerto, () => {
        resolve({ puerto });
      });
      this.#server.on('error', error => {
        logger.error(`Error de conexión: ${error}`);
        reject(error);
      });

    });
  }

  async disconnect() {
    return new Promise((resolve, reject) => {
      this.#server.close(error => {
        if (error) {
          logger.error(`Error de conexión: ${error}`);
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }
}

