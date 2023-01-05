import { Router } from "express";
import { fileOrTableExist } from "../controllers/controllerProds.js";
import {
    showForm,
    recoverProducts,
    saveProduct
} from "../controllers/handlebarsController.js";

export const routerWebProducts = Router(); // no olvidarse el export

routerWebProducts.get('/', fileOrTableExist, showForm);
routerWebProducts.get('/products', fileOrTableExist, recoverProducts);
routerWebProducts.post('/products', fileOrTableExist, saveProduct);