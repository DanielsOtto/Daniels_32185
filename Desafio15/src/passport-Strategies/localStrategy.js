// Desafio 13 -- PASSPORT --- NO SE USA ESTE ARCHIVO 

// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
// import { SigninSchema } from '../models/user.js'; // trae el schema

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// }); // passport almacena en el navegador, va a devolver esos datos
// // al servidor utilizando el id del usuario

// passport.deserializeUser(async (id, done) => {
//   const user = await SigninSchema.findById(id);
//   //hay que buscar en la bbdd si ese ID existe
//   done(null, user);
// });


// //este esta mal
// //este metodo lo vamos a utilizar en la ruta signIn con el metodo POST
// passport.use('local-signin', new LocalStrategy({
//   emailField: 'email', // seria usernameField
//   passwordField: 'password',
//   passReqToCallback: true // esto nos permite recibir tmb el request
// }, async (req, name, email, password, done) => {
//   const user = new SigninSchema();
//   user.name = name;
//   user.email = email;
//   user.password = password;
//   // user.password = user.encryptPassword(password);
//   await user.save();
//   done(null, user);
//   //devuelve null para el error, y el usuario registrado
// }));


// // asi esta bien
// passport.use('local-login', new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true
// }, async (req, email, password, done) => {
//   const user = await SigninSchema.findOne({ 'email': email })
//   if (user) {
//     return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
//   } else {
//     const newUser = new SigninSchema();
//     newUser.name = req.body.name;
//     newUser.email = email;
//     newUser.password = newUser.encryptPassword(password);
//     await newUser.save();
//     done(null, newUser);
//   }
// }));

// // video
// // fazt explica a la 1hora 9min 40 segs


