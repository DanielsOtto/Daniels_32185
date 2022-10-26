const express = require('express');
const Container = require('./Container');
const server = express();
const element = new Container('./fileBoxs.txt');

const posRandom = () => {
  return Math.ceil(4 * Math.random());
};

server.get('/products', async (peticion, respuesta) => {
  respuesta.send(await element.getAll());
});

server.get('/productsRandom', async (peticion, respuesta) => {
  respuesta.send(await element.getById(posRandom()));
});

const connect = (port = 0) => {
  return new Promise((resolve, reject) => {
    const connectedServer = server.listen(port, () => {
      resolve(connectedServer);
    });
    connectedServer.on('err', err => reject(err));
  })
};

module.exports = { connect };