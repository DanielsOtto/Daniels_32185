import express from 'express';
import { createServer } from 'http'; // para sockets
import { Server } from "socket.io";  // para sockets

import { engine } from 'express-handlebars';
// import { msgContainer } from './containers/MessagesContainer.js';
import { messagesContainer } from './containers/DataContainer.js'; // PERSISTENCIA
import { createMessagesTable } from './tables/createMessagesTable.js';
import { nameMsgTable } from './config/config.js';
import { randomUUID } from 'crypto';
import morgan from 'morgan'; // opcional
import session from 'express-session';

export const app = express(); // lo exporto a main -- dejo de utilizarlo
//MAIN se tiene que conectar con httpServer, para los sockets

export const httpServer = createServer(app); // para sockets
const io = new Server(httpServer) // para sockets

import logIn from './logIn.js'; // para las sessions
import { routerApiProds } from './routers/routerApiProducts.js';
import { routerWebProducts } from './routers/routerWebProducts.js';


// import path from 'path'; // opcional / sirve para unir directorios

// HANDLEBARS
// // si introducimos la carpeta de vistas en la carpeta de src
// // hay que avisarle a NODE Js donde esta la carpeta
// // para ello utilizamos el modulo path y la constante __dirname
// // que nos provee NODE Js
// // dirname nos devuelve la direccion del archivo que se ejecuta
// // app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');// como se va a visualizar


//Desafio 13 -- conectandome a mongo-atlas
import flash from 'connect-flash';
import passport from 'passport';


// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // con false no recibimos imagenes
app.use(express.static('public'));
app.use((req, res, next) => { req.io = io; next(); }); //este io es para productos
// asi puedo utilizar la conexion IO en otros archivos.
// middleware morgan
app.use(morgan('dev'));
// nos muestra mensajes en consola de los metodos usados
app.use(session({
  secret: 'duendeverde',
  resave: false,
  saveUninitialized: false
}));
app.use(flash()); // se declara antes que passport pero despues de sessions
app.use(passport.initialize());
app.use(passport.session());


// Desafio 13 -- PASSPORT
import { store } from './dao/dao.js' // NO BORRAR - sino, no conecta con MONGO ATLAS
import { Strategy as LocalStrategy } from 'passport-local';
import { SigninSchema } from './models/user.js'; // trae el schema

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

//este metodo es para loguearse // solucionado
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await SigninSchema.findOne({ email: email });
  if (!user) {
    return done(null, false, req.flash('loginMessage', 'User not found.'));
  }
  console.log(!(await user.comparePassword(password)));
  if (!(await user.comparePassword(password))) {
    console.log("saliste del compare")
    return done(null, false, req.flash('loginMessage', 'Incorrect password.'));
  }
  return done(null, user);
}));



//middleware
app.use((req, res, next) => {
  // crea variables que se pueden usar en las plantillas de vistas
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.loginMessage = req.flash('loginMessage');
  app.locals.user = req.user;
  next();
});


//Desafio 12 -- middleware session
logIn(app) // se conecta a la base de datos


//RUTAS
// web
app.use('/', routerWebProducts);

//rest  (las rutas son en plural)
app.use('/api/products', routerApiProds);



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



// PRIMERO CARGAR XAMMP
//DESPUES SQL
// despues la ruta
// en git bash => NODE_ENV=prod nodemon src/main.js