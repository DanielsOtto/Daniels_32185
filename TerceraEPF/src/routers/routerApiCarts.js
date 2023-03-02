import {
    addProducts,
    cleanCart,
    showProducts,
    deleteOneProdCart
} from "../controllers/controllersCart.js";
import { Router } from "express";
const routerApiCart = Router();


// '/api/shoppingcartproducts'
routerApiCart.post('/', addProducts);
// "Agrega productos al carrito", "{{SERVER}}/api/shoppingcartproducts", "method", "POST" // REVISAR ESTA RUTA
routerApiCart.get('/', showProducts);
// "Lista productos del carrito", "{{SERVER}}/api/shoppingcartproducts", "method", "GET" // no recibe nada xq da el carrito del usuario loggueado
routerApiCart.delete('/:id_prod', deleteOneProdCart);
// "Quitar producto del carrito", "{{SERVER}}/api/shoppingcartproducts/{{PRODUCT_ID}}", "method", "DELETE"
routerApiCart.delete('/', cleanCart);
// "Vaciar carrito", "{{SERVER}}/api/shoppingcartproducts", "method", "DELETE"


export default routerApiCart;