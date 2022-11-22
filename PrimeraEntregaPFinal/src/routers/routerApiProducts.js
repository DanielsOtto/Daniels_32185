import {
  get,
  getById,
  post,
  updateById,
  deleteById
} from '../controllers/controllersProducts.js';
import { Router } from 'express';
const routerApiProducts = Router();
let adminOn = false;

function restrictedEntry(req, res, next) {
  try {
    if (adminOn) {
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    throw new Error(error);
  }
}

routerApiProducts.post('/login', (req, res) => {
  try {
    adminOn = true;
    console.log(adminOn)
    res.sendStatus(200);
  } catch (error) {
    throw new Error('Error al loguearse');
  }
})

routerApiProducts.post('/logout', (req, res) => {
  try {
    adminOn = false;
    res.sendStatus(200);
  } catch (error) {
    throw new Error('Error al desconectarse');
  }
})

routerApiProducts.get('/', get);
routerApiProducts.get('/:id', getById);
routerApiProducts.post('/', restrictedEntry, post);
routerApiProducts.put('/:id', restrictedEntry, updateById);
routerApiProducts.delete('/:id', restrictedEntry, deleteById);

export default routerApiProducts;