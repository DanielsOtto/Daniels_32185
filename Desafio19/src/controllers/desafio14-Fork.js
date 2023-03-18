import { fork } from 'child_process';
import path from 'path';
import { calculateNumbers, getInfoObj_Process } from '../services/tasks.services.js';

// COMPLETO 07/03

export function infoObjProcess(req, res) {
  const object = getInfoObj_Process();
  res.json(object);
}


export function getNumbers({ params }, res, next) {
  const { number } = params;
  const child = calculateNumbers(number);

  child.on('message', msg => {
    if (msg.event === 'response') {
      res.json(msg.respuesta);
    } else {
      res.sendStatus(400); // next(error)
    }
  });
}