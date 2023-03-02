import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { chosenUsersContainers as users } from "../dao/DataContainer.js";
import { createAccount, findByEmail } from '../models/userModel.js';
import { validatePassword } from '../middlewares/hashPass.js';
import { logger } from '../log/pino.js';


export default function passport_config() {

  // serialize user  /// GUARDA EL ID del objeto, 
  passport.serializeUser((user, done) => {
    done(null, user.id); // usar el id de crypto, no el de mongo
  }); // de esta forma passport almacena en el navegador

  //deserialize user /// para identificar el objeto. necesito el ID, y busco en bbdd
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await users.getById(id);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }); // de esta forma passport busca en el navegador


  // aca me registro, desde aca mando el mail al admin
  // datos ? todo el objeto usuario
  // asunto ? nuevo registro
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      if (await findByEmail(email)) throw new Error('Do you already have an account');
      const user = await createAccount(req.body);
      if (!user) throw new Error('Error creating user');
      done(null, user);
    } catch (err) {
      logger.error(err.message);
      return done(err);
    }
  }));


  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async ({ body }, email, password, done) => {
    try {
      const user = await findByEmail(email); //BUSCA AL USUARIO MEDIANTE EL ID
      if (!user || !validatePassword(body)) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      logger.error(err.message)
      return done(err);
    }
  }));
}