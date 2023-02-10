import { Router } from "express";
import passport from "passport";
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
routerWebProducts.get('/menu', showMenu); // botones registro y logueo
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