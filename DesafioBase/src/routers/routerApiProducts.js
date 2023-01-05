import { Router } from 'express';
import { fileOrTableExist } from '../controllers/controllerProds.js';
import {
    getProducts,
    getById,
    saveProduct,
    updateById,
    deleteAll,
    deleteById
} from '../controllers/controllerProds.js';

// cree el MIDDLEWARE  fileExiste porque la ruta deleteAll 
// no borra el contenido del archivo, sino que, lo elimina
//con este MIDDLEWARE, si no existe el archivo lo crea

export const routerApiProds = Router();

routerApiProds.get('/', fileOrTableExist, getProducts);
routerApiProds.get('/:id', fileOrTableExist, getById);
routerApiProds.post('/', fileOrTableExist, saveProduct);
routerApiProds.put('/:id', fileOrTableExist, updateById);
routerApiProds.delete('/', fileOrTableExist, deleteAll);
routerApiProds.delete('/:id', fileOrTableExist, deleteById);
