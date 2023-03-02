import express from 'express';
import { createServer } from 'http'; // para sockets
import { Server } from "socket.io";  // para sockets
import { engine } from 'express-handlebars';

// import { msgContainer } from './containers/MessagesContainer.js'; 
import { messagesContainer } from '../containers/DataContainer.js'; // PERSISTENCIA
import { createMessagesTable } from '../tables/createMessagesTable.js';
import { nameMsgTable } from '../config/config.js';
import { randomUUID } from 'crypto';
import morgan from 'morgan'; // opcional
import session from 'express-session';

export const app = express(); // lo exporto a main -- dejo de utilizarlo

// import { routerApiProds } from '../routers/routerApiProducts.js';
// import { routerWebProducts } from '../routers/routerWebProducts.js';

export const httpServer = createServer(app); // para sockets 
const io = new Server(httpServer) // para sockets

import logIn from '../logIn.js'; // para las sessions

//Desafio 13 -- conectandome a mongo-atlas
import flash from 'connect-flash';
import passport from 'passport';
// Desafio 13 -- PASSPORT
import { store } from '../dao/dao.js' // NO BORRAR - sino, no conecta con MONGO ATLAS
import { Strategy as LocalStrategy } from 'passport-local';
import { SigninSchema } from '../models/user.js'; // trae el schema



// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');// como se va a visualizar 



// // MIDDLEWARES
// app.use(express.json());
// app.use(express.urlencoded({ extended: false })); // con false no recibimos imagenes
// app.use(express.static('public'));
// app.use((req, res, next) => { req.io = io; next(); }); //este io es para productos
// // asi puedo utilizar la conexion IO en otros archivos.
// // middleware morgan
// app.use(morgan('dev'));
// // nos muestra mensajes en consola de los metodos usados
// app.use(session({
//   secret: 'duendeverde',
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(flash()); // se declara antes que passport pero despues de sessions
// app.use(passport.initialize());
// app.use(passport.session());



passport.serializeUser((user, done) => {
  done(null, user.id);
}); // passport almacena en el navegador, va a devolver esos datos
// al servidor utilizando el id del usuario

passport.deserializeUser(async (id, done) => {
  const user = await SigninSchema.findById(id);
  //hay que buscar en la bbdd si ese ID existe
  done(null, user);
});

//este metodo lo vamos a utilizar en la ruta signIn con el metodo POST
// este metodo es para registrarse
passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await SigninSchema.findOne({ 'email': email })
  console.log(user)
  if (user) {
    return done(null, false, req.flash('signinMessage', 'The Email is already Taken.'));
  } else {
    const newUser = new SigninSchema();
    newUser.name = req.body.name;
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    console.log(newUser)
    await newUser.save();
    return done(null, newUser);
  }
}));

//este metodo es para loguearse // el problema TIENE QUE ESTAR aca !!!
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await SigninSchema.findOne({ email: email });
  if (!user) {
    return done(null, false, req.flash('loginMessage', 'User not found.'));
  }
  console.log(!(await user.comparePassword(password))); // con await no da pending mintiendo da true
  //diciendo la verdad se cuelga
  if (!(await user.comparePassword(password))) {
    console.log("saliste del compare")
    return done(null, false, req.flash('loginMessage', 'Incorrect password.'));
  }
  return done(null, user);
}));



// middleware
// app.use((req, res, next) => {
//   // crea variables que se pueden usar en las plantillas de vistas
//   app.locals.signinMessage = req.flash('signinMessage');
//   app.locals.loginMessage = req.flash('loginMessage');
//   app.locals.user = req.user;
//   next();
// });


// //Desafio 12 -- middleware session
// logIn(app) // se conecta a la base de datos 


// //RUTAS
// // web
// app.use('/', routerWebProducts);

// rest  (las rutas son en plural)
// app.use('/api/products', routerApiProds);



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
      throw new Error('Error al conectar con los sockets newMessage');
      // console.log(err);
    }
  });
})




/// COMIENZO routerWebProduct


import { Router } from "express";
// import passport from "passport";
import { fileOrTableExist } from "../controllers/controllerProds.js";
import {
  showForm,
  recoverProducts,
  saveProduct,
  // showLogin,
  // register,
  // logOff,
} from "../controllers/handlebarsController.js";
import {
  showMenu,
  showSignin,
  showLoginPassp,
  doLogout,
  isAuthenticated,
  accesProfile
} from '../controllers/passportController.js';
import { calculateNumbers, infoObjProcess } from "../controllers/desafio14-Fork.js";



export const routerWebProducts = Router(); // no olvidarse el export

// // Desafio 12
// routerWebProducts.get('/registro', showLogin);
// routerWebProducts.post('/registro', register); // register
// routerWebProducts.get('/desconectarse', logOff); // desconectarse

// Desafio 13
routerWebProducts.get('/home', showMenu); // botones registro y logueo
routerWebProducts.get('/signin', showSignin); // formulario de registro
routerWebProducts.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/signin',
  passReqToCallback: true
}));
routerWebProducts.get('/login', showLoginPassp); // formulario de logueo
routerWebProducts.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  passReqToCallback: true
})); // loguearse
routerWebProducts.get('/logout', doLogout); // desloguearse

// necesitan middleware de logueados

//rutas desafios anteriores
routerWebProducts.get('/', fileOrTableExist, isAuthenticated, showForm);
routerWebProducts.get('/products', fileOrTableExist, isAuthenticated, recoverProducts);
routerWebProducts.post('/products', fileOrTableExist, isAuthenticated, saveProduct);
//---agregado no pedido
routerWebProducts.get('/profile', fileOrTableExist, isAuthenticated, accesProfile); // panel de control


// instalados passport y passport-local / morgan / connect-flash
// JWT para encriptar la contraseña del usuario

// falta el middleware -- soloLogueados --
// una vez que se loguean correctamente se redirige al formulario
// cartel de bienvenida con nombre y usuario

// ----------------------------------------------------
// DESAFIO 14

routerWebProducts.get('/api/info', infoObjProcess);
routerWebProducts.get('/api/randoms/:number?', calculateNumbers);
// el simbolo de pregunta despues de :number '?' hace que el parametro sea opcional
// por lo tanto puede o no usarse, y en el controlador defini que si no se encuentra
//el parametro, se utilice el numero 100.000 por defecto!!


/// FIN routerWebProduct




//estructura basica para levartar un server sin importar cuantos procesadores use

// necesita importar express -- se importa desde arriba del todo  // CLASE 15

//si queremos que anden los sockets hay q conectar el server con httpServer

export class Servidor {
  #app;
  #server;
  constructor() {
    this.#app = express();
    // no anda aun asi
    this.#app.engine('handlebars', engine());
    this.#app.set('view engine', 'handlebars');// como se va a visualizar 
    // MIDDLEWARES
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: false })); // con false no recibimos imagenes
    this.#app.use(express.static('public'));
    this.#app.use((req, res, next) => { req.io = io; next(); }); //este io es para productos
    // asi puedo utilizar la conexion IO en otros archivos.
    this.#app.use(morgan('dev'));    // middleware morgan
    // nos muestra mensajes en consola de los metodos usados
    this.#app.use(session({
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

    //RUTAS
    // web
    this.#app.use('/', routerWebProducts);
  }

  async connect({ puerto = 0 }) {
    return new Promise((resolve, reject) => {
      this.#server = this.#app.listen(puerto, () => {
        resolve({ puerto });
      });
      this.#server.on('error', error => {
        logger.fatal(`Error de conexión: ${error}`);
        reject(error);
      });
      //Desafio 12 -- middleware session // agregado desafio 15
      logIn(this.#app) // se conecta a la base de datos 
    });
  }

  // async connect({ port = 0 }) {
  //   return new Promise((resolve, reject) => {
  //     this.#server = this.#app.listen(port, () => {
  //       resolve({ port });
  //     });
  //     this.#server.on('error', error => {
  //       reject(error);
  //     });
  //     //Desafio 12 -- middleware session // agregado desafio 15
  //     logIn(this.#app) // se conecta a la base de datos 
  //   });
  // }
  async disconnect() {
    return new Promise((resolve, reject) => {
      this.#server.close(error => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }
}

