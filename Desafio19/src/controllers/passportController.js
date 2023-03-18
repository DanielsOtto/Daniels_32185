// import { app } from "../server/Servidor.js";

// NO TIENE Q TENER LOGICA -- tiene logica ?

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
    res.redirect('/menu');
  });
}

export function accesProfile(req, res) {
  // no puede verlo xq app.locals.user es undefined
  res.render('profileMain', { user: req.user.toObject() });
  //El problema es que el objeto _id de Mongoose es de tipo ObjectId, 
  //y no se puede acceder a sus propiedades con notación de punto.
  // Para acceder a las propiedades del objeto _id, puedes utilizar la función toObject() de Mongoose.
}