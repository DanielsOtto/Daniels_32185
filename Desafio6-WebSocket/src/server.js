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
//middleware en el server, creado para que agarre todas las peticiones y las guarde en una referencia al objeto io
app.use((req, res, next) => { req.io = io; next(); });  //----- PARA LA FORMA  A -- anda perfecto

// RUTAS
app.use('/', routerWeb);

// SOCKET
io.on('connection', async socket => { //agregado async  verb

  socket.on('newMessage', async msg => {
    msg.date = new Date().toLocaleString();
    await element.saveMessage(msg);
    const arrayMsgs = await element.getMessages();
    io.sockets.emit('updatedMsgs', arrayMsgs);
  });
  // const array = await element.getAll(); //agregado verb
  // io.sockets.emit('showProducts', array) //agregado verb

  // socket.on('sendP', async () => {
  //   const allP = await element.getAll();
  //   io.sockets.emit('updateProducts', allP);
  // });
  // io.sockets.emit('updateProducts', await element.getAll()); // forma b hacia polling -- 
});

const server = httpServer.listen(app.get('port'), (req, res) => {  // OJO cambia aca
  try {
    console.log(`server on in port ${server.address().port}`);
  } catch (error) {
    throw new Error('error al levantar el archivo');
  }
});
