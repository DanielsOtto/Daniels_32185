import session from 'express-session'; // para las sessions
import MongoStore from 'connect-mongo'; // para las sessions
import { MONGO_CNS } from './config.js';

const mongoUrl = MONGO_CNS; // string correcta para conectarse a mongo atlas

export default function logIn(server) {

  server.use(session({ // inicializamos el session
    store: MongoStore.create({ mongoUrl, ttl: 600 }), //, ttl: 60
    secret: 'monosilabos',
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   maxAge: 600000
    // }
  }));
}