import express from 'express';
import morgan from 'morgan';
import { router } from '../routers/router.js';
import { logger } from '../logger/pino.js';


export default class Servidor {
  #app
  #server
  constructor() {
    this.#app = express();
    this.#app.use(morgan('dev'));
    this.#app.use('/api', router);
  }
  async conectar({ puerto = 0 }) {
    return new Promise((resolve, reject) => {
      this.#server = this.#app.listen(puerto, () => {
        resolve({ puerto });
      });
      this.#server.on('error', error => {
        logger.fatal(`Error de conexión: ${error}`);
        reject(error);
      });
    });
  }

  async desconectar() {
    return new Promise((resolve, reject) => {
      this.#server.close(error => {
        if (error) {
          logger.fatal(`Error de conexión: ${error}`);
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }
}