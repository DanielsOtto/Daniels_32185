import express from 'express';
import MongoStore from 'connect-mongo'; // para las sessions
import { MONGO_CNS_D20 } from '../config/mongodb.js';

import morgan from 'morgan'; // opcional
import session from 'express-session';

import { logger } from '../config/pino.js';
import { routerApiProds } from '../routers/routerApiProducts.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import { graphqlMiddleware } from '../middlewares/graphQLMiddleware.js';

const mongoUrl = MONGO_CNS_D20;

export class Servidor {
  #app;
  #server;
  constructor() {
    this.#app = express();

    // MIDDLEWARES
    this.#app.use(morgan('dev'));    // middleware morgan
    this.#app.use(express.urlencoded({ extended: false })); // con false no recibimos imagenes
    this.#app.use(express.json());
    this.#app.use(session({
      store: MongoStore.create({ mongoUrl, ttl: 600 }), //, ttl: 60
      secret: 'duendeverde',
      resave: false,
      saveUninitialized: false
    }));


    this.#app.use('/api/products', routerApiProds); // probando des 20
    this.#app.use('/graphql', graphqlMiddleware); // DESAFIO 22
    this.#app.use(errorHandler);
    this.#app.use("*", (req, res) => {
      const err = Error(`Requested path ${req.path} not found`);
      res.status(404).send({
        success: false,
        message: `Requested path ${req.path} not found`,
        stack: err.stack,
      });
    });
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