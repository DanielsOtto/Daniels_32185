import { app } from "../server.js";

export function showMenu(req, res) {
  res.render('passportMain');
}

export function showSignin(req, res) {
  res.render('signInMain');
}

export async function showLoginPassp(req, res) {
  res.render('logPassportMain');
}

export function doLogout(req, res) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/home');
  });
}

export function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();   // el return es necesario, si no, no anda
  }
  res.redirect('home');
}

export function accesProfile(req, res) {
  res.render('profileMain', { user: app.locals.user.toObject() });
  //El problema es que el objeto _id de Mongoose es de tipo ObjectId, 
  //y no se puede acceder a sus propiedades con notación de punto.
  // Para acceder a las propiedades del objeto _id, puedes utilizar la función toObject() de Mongoose.
}