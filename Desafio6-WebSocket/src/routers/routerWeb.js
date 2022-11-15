const express = require('express');
const { controllerForm, controllerGet, controllerPost } = require('../controllers/controller.js');

const routerWeb = express.Router();
routerWeb.get('/', controllerForm);
routerWeb.get('/products', controllerGet);
routerWeb.post('/products', controllerPost);

exports.routerWeb = routerWeb;