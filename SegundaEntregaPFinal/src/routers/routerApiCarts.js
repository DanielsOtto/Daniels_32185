import {
    createC,
    addProducts,
    cleanCart,
    showProducts,
    deleteOneP
} from "../controllers/controllersCart.js";
import { Router } from "express";
const routerApiCart = Router();

routerApiCart.post('/', createC);
routerApiCart.post('/:id_cart/products', addProducts);
routerApiCart.delete('/:id_cart', cleanCart);
routerApiCart.get('/:id_cart/products', showProducts);
routerApiCart.delete('/:id_cart/products/:id_prod', deleteOneP);

export default routerApiCart;