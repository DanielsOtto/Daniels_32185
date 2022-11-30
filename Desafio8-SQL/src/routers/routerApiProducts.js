import {
    get,
    post,
    getById,
    deleteAll,
    createProductsTable,
    updateById,
    deleteById
} from '../controllers/productControllers.js';
import { Router } from 'express';
const routerApiProducts = Router();

routerApiProducts.get('/', createProductsTable, get);
routerApiProducts.post('/', createProductsTable, post);
routerApiProducts.get('/:id_prod', createProductsTable, getById);
routerApiProducts.put('/:id_prod', createProductsTable, updateById);
routerApiProducts.delete('/', createProductsTable, deleteAll);
routerApiProducts.delete('/:id_prod', createProductsTable, deleteById);

export default routerApiProducts;
