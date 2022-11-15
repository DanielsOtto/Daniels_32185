const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
// 6 lineas necesarias para trabajar con sockets desde express
const { routerWeb } = require('./routers/routerWeb.js');
const { engine } = require('express-handlebars');
app.set('port', process.env.PORT || 8080);
const element = require('./Container.js');

// configuracion Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

//MIDDLEWARES
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// RUTAS
app.use('/', routerWeb);

// SOCKET
io.on('connection', socket => {

  socket.on('newMessage', async msg => {
    msg.date = new Date().toLocaleString();
    await element.saveMessage(msg);
    const arrayMsgs = await element.getMessages();
    io.sockets.emit('updatedMsgs', arrayMsgs);
  });

  socket.on('sendP', async () => {
    const allP = await element.getAll();
    io.sockets.emit('updateList', allP);
  });
});

const server = httpServer.listen(app.get('port'), (req, res) => {  // OJO cambia aca
  try {
    console.log(`server on in port ${server.address().port}`);
  } catch (error) {
    throw new Error('error al levantar el archivo');
  }
});