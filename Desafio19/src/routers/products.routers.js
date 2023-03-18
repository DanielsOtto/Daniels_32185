import { Router } from "express";
import isAuthenticated from "../middlewares/authenticated.js";
import fileOrTableExist from '../middlewares/fileOrTableExist.js';
import {
    saveProduct,
    recoverProducts
} from '../controllers/productsController.js';

const routerProducts = Router();

routerProducts.get('/products', fileOrTableExist, isAuthenticated, recoverProducts);
routerProducts.post('/products', fileOrTableExist, isAuthenticated, saveProduct);

export default routerProducts;