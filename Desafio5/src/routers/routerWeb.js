const express = require('express');
const { controllerGet, controllerPost, controllerForm } = require('../controllers/controller.js')


const routerWeb = express.Router();
routerWeb.get('/', controllerForm); // anda
routerWeb.get('/products', controllerGet); // anda
routerWeb.post('/products', controllerPost); // anda

exports.routerWeb = routerWeb;