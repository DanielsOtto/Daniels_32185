// clase 19  ESTRUCTURA ONION
import { Router } from "express";
import passport from "passport";

import {
  showSignin,
  showLoginPassp,
  doLogout,
} from '../controllers/passportController.js';

const routerUser = Router();

routerUser.get('/signin', showSignin); // formulario de registro
routerUser.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/menu',
  failureRedirect: '/signin',
  passReqToCallback: true
}));
routerUser.get('/login', showLoginPassp); // formulario de logueo
routerUser.post('/login', passport.authenticate('local-login', {
  successRedirect: '/menu',
  failureRedirect: '/login',
  passReqToCallback: true
})); // loguearse
routerUser.get('/logout', doLogout); // desloguearse


export default routerUser;