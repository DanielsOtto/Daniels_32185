import { Router } from 'express';
import compression from 'compression';
import { logger } from '../logger/pino.js';
import {
  infoObjProcess,
  calculateNumbers
} from '../controllers/controllers.js'

function loggMid(req, res, next) {
  logger.info(`Ruta accedida: ${req.url}, metodo utilizado: ${req.method}`);
  next();
}

export const router = Router();
router.get('/', loggMid, (req, res, next) => {
  res.send(`[pid: ${process.pid}] peticion recibida!`);
});
router.get('/prueba', loggMid, (req, res, next) => {
  res.json({ mensaje: 101 });
});

// DESAFIO 14
router.get('/info', loggMid, infoObjProcess);
router.get('/randoms/:number?', loggMid, calculateNumbers);
router.get('/randomsComp/:number?', compression(), calculateNumbers);
// el simbolo de pregunta despues de :number '?' hace que el parametro sea opcional
// por lo tanto puede o no usarse, y en el controlador defini que si no se encuentra
//el parametro, se utilice el numero 100.000 por defecto!!

router.all('*', (req, res) => {
  logger.warn(`WARN -- Ruta accedida: ${req.url}, metodo utilizado: ${req.method}`)
  logger.error('FATAL ERROR')
  res.status(404);
  res.json({ error: 'ruta incorrecta' });
});