import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { chosenUsersContainers as users } from "../dao/DataContainer.js";
import { createAccount, findByEmail } from '../models/userModel.js';
import { validatePassword } from './hashPass.js';
import { sendsMails } from './nodemailer.js';
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


  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      if (await findByEmail(email)) throw new Error('Do you already have an account');
      const user = await createAccount(req.body);
      if (!user) throw new Error('Error creating user');
      const { name, lastname, image, idCart, id } = req.body;
      const message = {
        from: 'Sender Name <admin@admin>',
        to: 'Sender Name <admin@admin>',
        subject: 'New Register ✔',
        text: `New user register
              User data:
              Name: ${name}
              Lastname: ${lastname}
              Email: ${email}
              Password: ${user.password}
              Avatar: ${image}
              ID_USER: ${user.id}
              ID_Cart: ${user.idCart}
              `,
        html: `<h2>New Register</h2>
                <p>User data:</p>
                <ul>
                  <li><strong>Name:</strong> ${name}</li>
                  <li><strong>Lastname:</strong> ${lastname}</li>
                  <li><strong>Email:</strong> ${email}</li>
                  <li><strong>Password:</strong> ${user.password}</li>
                  <li><strong>Avatar:</strong> ${image}</li>
                  <li><strong>ID_USER:</strong> ${user.id}</li>
                  <li><strong>ID_Cart:</strong> ${user.idCart}</li>
                </ul>`
      };

      sendsMails.send(message);
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