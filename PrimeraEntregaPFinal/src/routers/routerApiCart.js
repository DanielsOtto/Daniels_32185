import {
    postCreateCart,
    postAddProducts,
    deleteAllProducts,
    getCartProducts,
    deleteOneProductById
} from '../controllers/controllersCart.js';
import { Router } from 'express';
const routerApiCart = Router();

routerApiCart.post('/', postCreateCart);
routerApiCart.delete('/:id_cart', deleteAllProducts);
routerApiCart.post('/:id_cart/products', postAddProducts);
routerApiCart.get('/:id_cart/products', getCartProducts);
routerApiCart.delete('/:id_cart/products/:id_prod', deleteOneProductById);

export default routerApiCart;