import {
    getAllProducts,
    getByIdProducts,
    saveProduct,
    updateById,
    deleteById
} from '../controllers/controllersProds.js';
import { Router } from 'express';

const routerApiProds = Router();

routerApiProds.get('/', getAllProducts);
routerApiProds.get('/:id', getByIdProducts);
routerApiProds.post('/', saveProduct);
routerApiProds.put('/:id', updateById);
routerApiProds.delete('/:id', deleteById);

export default routerApiProds;