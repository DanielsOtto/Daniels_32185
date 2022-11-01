const express = require('express');
const { controllerGet,
  controllerGetById,
  controllerPost,
  controllerPutById,
  controllerDeleteById } = require("../controllers/controllerGet.js");

const routerApi = express.Router();
routerApi.get('/', controllerGet); // COMPROBADO  ANDA  CORRECTAMENTE
routerApi.get('/:id', controllerGetById); // COMPROBADO  ANDA  CORRECTAMENTE
routerApi.post('/', controllerPost); // COMPROBADO  ANDA  CORRECTAMENTE
routerApi.put('/:id', controllerPutById); // COMPROBADO, ANDA CORRECTAMENTE
routerApi.delete('/:id', controllerDeleteById); // COMPROBADO, ANDA CORRECTAMENTE

exports.routerApi = routerApi;
