const element = require('../Container');
const { randomUUID } = require('crypto');
// //-- 
// const express = require('express');
// const app = express();
// const { Server: HttpServer } = require('http');
// const { Server: IOServer } = require('socket.io');
// const httpServer = new HttpServer(app);
// const io = new IOServer(httpServer);
// //-- 


async function form(req, res) {
  try {
    res.render('form');
  } catch (error) {
    throw new Error('Error al cargar el formulario');
  }
}

async function get(req, res) {
  try {
    const prods = await element.getAll();
    res.render('historial', { prods, hayProductos: prods.length > 0 });
  } catch (error) {
    throw new Error('Se ha producido un error en el controlador GET');
  }
}

async function post({ body, io }, res) {
  try {
    const object = body;
    object.id = randomUUID();
    await element.save(object);
    // res.redirect('/'); // devuelve un html, necesito JSON o res.send FORMA B --- hacia polling 
    io.sockets.emit('updateProducts', await element.getAll()); // FORMA A --- anda perfecto
    res.status(201);
    res.json(object);
  } catch (error) {
    throw new Error('Se ha producido un error en el controlador POST');
  }
}

exports.controllerGet = get;
exports.controllerPost = post;
exports.controllerForm = form;