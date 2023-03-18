import express from 'express';
import { createServer } from 'http'; // para sockets
import { Server } from "socket.io";  // para sockets
import MongoStore from 'connect-mongo'; // para las sessions
import { engine } from 'express-handlebars';
import { MONGO_CNS } from '../config/config.js';

// import { msgContainer } from './containers/MessagesContainer.js';
import { messagesContainer } from '../daos/DataContainer.js'; // PERSISTENCIA
import { createMessagesTable } from '../dataAccess/tables/createMessagesTable.js';
import { nameMsgTable } from '../config/config.js';
import { randomUUID } from 'crypto';
import morgan from 'morgan'; // opcional
import session from 'express-session';
import { logger } from '../config/pino.js';

import flash from 'connect-flash';
import passport from 'passport';
import passport_config from '../config/passport-local.js';

passport_config();


import routerUser from '../routers/users.router.js';
import routerTasks from '../routers/tasks.routers.js';
import routerProducts from '../routers/products.routers.js';
import routerMenu from '../routers/menu.routers.js';
import { routerApiProds } from '../routers/routerApiProducts.js';

const mongoUrl = MONGO_CNS; // string correcta para conectarse a mongo atlas


export class Servidor {
  #app;
  #server;
  #httpServer;
  #io;
  constructor() {
    this.#app = express();

    this.#httpServer = createServer(this.#app);
    this.#io = new Server(this.#httpServer);

    this.#app.use(morgan('dev'));    // middleware morgan
    this.#app.engine('handlebars', engine());
    this.#app.set('view engine', 'handlebars');// como se va a visualizar
    // MIDDLEWARES
    // this.#app.use((req, res, next) => { req.io = io; next(); }); //este io es para productos
    this.#app.use((req, res, next) => { req.io = this.#io; next(); }); //este io es para productos
    this.#app.use(express.urlencoded({ extended: false })); // con false no recibimos imagenes
    this.#app.use(express.static('public'));
    this.#app.use(express.json());
    // asi puedo utilizar la conexion IO en otros archivos.
    this.#app.use(session({
      store: MongoStore.create({ mongoUrl, ttl: 600 }), //, ttl: 60
      secret: 'duendeverde',
      resave: false,
      saveUninitialized: false
    }));
    this.#app.use(flash()); // se declara antes que passport pero despues de sessions
    this.#app.use(passport.initialize());
    this.#app.use(passport.session());
    this.#app.use((req, res, next) => {
      // crea variables que se pueden usar en las plantillas de vistas
      this.#app.locals.signinMessage = req.flash('signinMessage');
      this.#app.locals.loginMessage = req.flash('loginMessage');
      this.#app.locals.user = req.user;
      next();
    });

    //sockets
    this.#io.on('connection', async socket => { // lleva async..
      socket.on('newMessage', async msg => {
        try {
          msg.date = new Date().toLocaleString();
          msg.id = randomUUID();
          createMessagesTable(nameMsgTable);
          await messagesContainer.save(msg); // guardo nuevo mensaje
          const arrayMsgs = await messagesContainer.getAll(); // obtengo todos los mensajes
          this.#io.sockets.emit('show messages', arrayMsgs);
        } catch (err) {
          // throw new Error('Error al conectar con los sockets newMessage');
          this.#io.sockets.emit('ERROR')
        }
      });
    })



    //RUTAS
    this.#app.use('/', routerProducts);
    this.#app.use('/', routerTasks);
    this.#app.use('/', routerMenu);
    this.#app.use('/', routerUser);
    this.#app.use('/api/products', routerApiProds); // probando des 20

    this.#app.use("*", (req, res) => {
      const err = Error(`Requested path ${req.path} not found`);
      res.status(404).send({
        success: false,
        message: `Requested path ${req.path} not found`,
        stack: err.stack,
      });
    });
  }

  async connect({ puerto = 0 }) {
    return new Promise((resolve, reject) => {
      this.#server = this.#httpServer.listen(puerto, () => {
        resolve({ puerto });
      });
      this.#server.on('error', error => {
        logger.error(`Error de conexión: ${error}`);
        reject(error);
      });

    });
  }

  async disconnect() {
    return new Promise((resolve, reject) => {
      this.#server.close(error => {
        if (error) {
          logger.error(`Error de conexión: ${error}`);
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }
}