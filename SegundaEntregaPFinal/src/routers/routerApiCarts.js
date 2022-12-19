import {
    createC,
    addProducts,
    cleanCart,
    showProducts,
    deleteOneP,
    createFileS
} from "../controllers/controllersCart.js";
import { Router } from "express";
const routerApiCart = Router();

routerApiCart.post('/', createFileS, createC);
routerApiCart.post('/:id_cart/products', createFileS, addProducts);
routerApiCart.delete('/:id_cart', createFileS, cleanCart);
routerApiCart.get('/:id_cart/products', createFileS, showProducts);
routerApiCart.delete('/:id_cart/products/:id_prod', createFileS, deleteOneP);

export default routerApiCart;