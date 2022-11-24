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
import { Router } from 'express';
const routerApiProducts = Router();

routerApiProducts.post('/login', adminLogin);
routerApiProducts.post('/logout', adminLogout);
routerApiProducts.get('/', get);
routerApiProducts.get('/:id', getById);
routerApiProducts.post('/', restrictedEntry, post);
routerApiProducts.put('/:id', restrictedEntry, updateById);
routerApiProducts.delete('/:id', restrictedEntry, deleteById);

export default routerApiProducts;