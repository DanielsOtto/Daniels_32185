import {
    get,
    post,
    getById,
    deleteAll,
    createProductsTable
} from '../controllers/productControllers.js';
import { Router } from 'express';
const routerApiProducts = Router();

routerApiProducts.get('/', createProductsTable, get);
routerApiProducts.post('/', createProductsTable, post);
routerApiProducts.get('/:id_prod', createProductsTable, getById);
routerApiProducts.delete('/', createProductsTable, deleteAll);

export default routerApiProducts;
