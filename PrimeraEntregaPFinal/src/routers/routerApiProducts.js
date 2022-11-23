import {
  adminLogin,
  adminLogout,
  restrictedEntry,
  get,
  getById,
  post,
  updateById,
  deleteById
} from '../controllers/controllersProducts.js';
import { notFound } from '../controllers/controllersCart.js';
import { Router } from 'express';
const routerApiProducts = Router();

routerApiProducts.post('/login', adminLogin);
routerApiProducts.post('/logout', adminLogout);
routerApiProducts.get('/', get);
routerApiProducts.get('/:id', getById);
routerApiProducts.post('/', restrictedEntry, post);
routerApiProducts.put('/:id', restrictedEntry, updateById);
routerApiProducts.delete('/:id', restrictedEntry, deleteById);
routerApiProducts.all('*', notFound);

export default routerApiProducts;