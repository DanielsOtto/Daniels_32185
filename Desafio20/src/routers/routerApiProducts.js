import { Router } from 'express';
// import fileOrTableExist from '../middlewares/fileOrTableExist.js';
// import {
//   getProducts,
//   getById,
//   saveProduct,
//   updateById,
//   deleteAll,
//   deleteById,

// } from '../controllers/controllerProds.js';
import {
  saveProd,
  getAll,
  getOne,
  updateOne,
  deleteMany,
  deleteOne,
} from '../controllers/products.controller.js';

// cree el MIDDLEWARE  fileExiste porque la ruta deleteAll 
// no borra el contenido del archivo, sino que, lo elimina
//con este MIDDLEWARE, si no existe el archivo lo crea

export const routerApiProds = Router();

// routerApiProds.post('/', fileOrTableExist, saveProduct); mysql
routerApiProds.post('/', saveProd); //mongo anda
// routerApiProds.get('/', fileOrTableExist, getProducts); MYSQL
routerApiProds.get('/', getAll); // mongo anda
// routerApiProds.get('/:id', fileOrTableExist, getById); mySql
routerApiProds.get('/:id', getOne); //mongo anda
// routerApiProds.put('/:id', fileOrTableExist, updateById); mysql
routerApiProds.put('/:id', updateOne); // mongo anda
// routerApiProds.delete('/:id', fileOrTableExist, deleteById); mysql
routerApiProds.delete('/:id', deleteOne); //mongo
// routerApiProds.delete('/', fileOrTableExist, deleteAll); mysql
routerApiProds.delete('/', deleteMany); //mongo
