import {
    getAllProducts,
    getByIdProducts,
    saveProduct,
    updateById,
    deleteById,
    createFileS
} from '../controllers/controllersProds.js';
import { Router } from 'express';

const routerApiProds = Router();

routerApiProds.get('/', createFileS, getAllProducts);
routerApiProds.get('/:id', createFileS, getByIdProducts);
routerApiProds.post('/', createFileS, saveProduct);
routerApiProds.put('/:id', createFileS, updateById);
routerApiProds.delete('/:id', createFileS, deleteById);

export default routerApiProds;