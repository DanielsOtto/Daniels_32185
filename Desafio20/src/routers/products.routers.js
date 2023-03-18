import { Router } from "express";
import isAuthenticated from "../middlewares/authenticated.js";
// import fileOrTableExist from '../middlewares/fileOrTableExist.js';
// import {
//     saveProduct,
//     recoverProducts
// } from '../controllers/productsController.js';
import { getAll, saveProd } from "../controllers/products.controller.js";

const routerProducts = Router();

// routerProducts.get('/products', fileOrTableExist, isAuthenticated, recoverProducts); mysql
routerProducts.get('/products', isAuthenticated, getAll); // mongo ANDA
// routerProducts.post('/products', fileOrTableExist, isAuthenticated, saveProduct); mysql
routerProducts.post('/products', isAuthenticated, saveProd); // mongo ANDA

export default routerProducts;