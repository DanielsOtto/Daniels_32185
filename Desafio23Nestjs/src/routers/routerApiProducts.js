// CLASE 20 + 21
import { Router } from 'express';
import {
  saveProd,
  getAll,
  getOne,
  updateOne,
  deleteMany,
  deleteOne,
} from '../controllers/products.controller.js';

export const routerApiProds = Router();

routerApiProds.post('/', saveProd); //mongo anda
routerApiProds.get('/', getAll); // mongo anda
routerApiProds.get('/:id', getOne); //mongo anda
routerApiProds.put('/:id', updateOne); // mongo anda
routerApiProds.delete('/:id', deleteOne); //mongo
routerApiProds.delete('/', deleteMany); //mongo
