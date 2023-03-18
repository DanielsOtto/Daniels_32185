import passport from 'passport';
// Desafio 13 -- PASSPORT
import { store } from '../dataAccess/mongooseDao.js' // NO BORRAR - sino, no conecta con MONGO ATLAS
import { Strategy as LocalStrategy } from 'passport-local';
import { SigninSchema } from '../modelsMongoose/user.js'; // trae el schema
import { logger } from './pino.js';


export default function passport_config() {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  }); // passport almacena en el navegador, va a devolver esos datos
  // al servidor utilizando el id del usuario

  passport.deserializeUser(async (id, done) => {
    const user = await SigninSchema.findById(id);
    //hay que buscar en la bbdd si ese ID existe
    done(null, user);
  });


  passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    const user = await SigninSchema.findOne({ 'email': email })
    if (user) {
      return done(null, false, req.flash('signinMessage', 'The Email is already Taken.'));
    } else {
      const newUser = new SigninSchema();
      newUser.name = req.body.name;
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      logger.info(newUser);
      await newUser.save();
      return done(null, newUser);
    }
  }));


  //este metodo es para loguearse //
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    const user = await SigninSchema.findOne({ email: email });
    if (!user) {
      return done(null, false, req.flash('loginMessage', 'User not found.'));
    }
    //diciendo la verdad se cuelga
    if (!(await user.comparePassword(password))) {
      return done(null, false, req.flash('loginMessage', 'Incorrect password.'));
    }
    return done(null, user);
  }));

}