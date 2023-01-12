import express from 'express';

import { createServer } from 'http'; // para sockets
import { Server } from "socket.io";  // para sockets

import { engine } from 'express-handlebars';
import { routerApiProds } from './routers/routerApiProducts.js';
import { routerWebProducts } from './routers/routerWebProducts.js';

// import { msgContainer } from './containers/MessagesContainer.js'; 
import { messagesContainer } from './containers/DataContainer.js'; // PERSISTENCIA
import { createMessagesTable } from './tables/createMessagesTable.js';
import { MONGO_CNS, nameMsgTable } from './config/config.js';
import { randomUUID } from 'crypto';

export const app = express(); // lo exporto a main -- dejo de utilizarlo
//MAIN se tiene que conectar con httpServer, para los sockets

export const httpServer = createServer(app); // para sockets 
const io = new Server(httpServer) // para sockets

import session from 'express-session'; // para las sessions
import MongoStore from 'connect-mongo'; // para las sessions

// HANDLEBARS
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');// como se va a visualizar 

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use((req, res, next) => { req.io = io; next(); }); //este io es para productos
// asi puedo utilizar la conexion IO en otros archivos.

//Desafio 12 -- middleware session

const mongoUrl = MONGO_CNS; // string correcta para conectarse a mongo atlas

app.use(session({ // inicializamos el session
  store: MongoStore.create({ mongoUrl, ttl: 60 }),
  secret: 'monosilabos',
  resave: false,
  saveUnitizialized: false,
  // cookies: { maxAge: 12000 },
}));


//RUTAS
// web
app.use('/', routerWebProducts);

//rest  (las rutas son en plural)
app.use('/api/products', routerApiProds);

// PRIMERO CARGAR XAMMP
//DESPUES SQL
// despues la ruta


// SOCKETS
io.on('connection', async socket => { // lleva async..
  socket.on('newMessage', async msg => {
    try {
      msg.date = new Date().toLocaleString();
      msg.id = randomUUID();
      createMessagesTable(nameMsgTable);
      await messagesContainer.save(msg); // guardo nuevo mensaje
      const arrayMsgs = await messagesContainer.getAll(); // obtengo todos los mensajes
      io.sockets.emit('show messages', arrayMsgs);
    } catch (err) {
      // throw new Error('Error al conectar con los sockets newMessage');
      console.log(err);
    }
  });
})