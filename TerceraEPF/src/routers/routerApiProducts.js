import { Router } from 'express';
import valAuthenticate from '../middlewares/authLogin.js';
import { onlyAdmins } from '../middlewares/onlyAdmins.js'
import {
    getAllProducts,
    getByIdProducts,
    saveProduct,
    updateById,
    deleteById,
} from '../controllers/controllersProds.js';

const routerApiProds = Router();


routerApiProds.get('/', getAllProducts); // "Obtiene todos los productos" NADA 
routerApiProds.get('/:id', getByIdProducts);// "Obtiene un producto" PARAMS
routerApiProds.post('/', valAuthenticate, onlyAdmins, saveProduct); // "Ingresa un producto"  BODY
routerApiProds.put('/:id', valAuthenticate, onlyAdmins, updateById); // "Actualiza producto"  PARAMS
routerApiProds.delete('/:id', onlyAdmins, valAuthenticate, deleteById); // "Elimina un producto" PARAMS

// "name": "Ingresa un producto", "url": "{{SERVER}}/api/products", "method": "POST"
// "name": "Obtiene todos los productos", "url": "{{SERVER}}/api/products", "method": "GET"
// "name": "Obtiene un producto", "url": "{{SERVER}}/api/products/{{PRODUCT_ID}}", "method": "GET"
// "name": "Actualiza producto", "url": "{{SERVER}}/api/products/{{PRODUCT_ID}}", "method": "PUT"
// "name": "Elimina un producto", "url": "{{SERVER}}/api/products/{{PRODUCT_ID}}", "method": "DELETE"
export default routerApiProds;


// createFileS,
// createFileS,
// createFileS,
// createFileS,
// createFileS,