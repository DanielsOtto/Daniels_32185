import { logger } from "../config/pino.js";


export async function showLogin({ session }, res, next) {
  try {
    session?.user ? res.render('formMain') : res.render('loginMain');
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export async function logOff({ session }, res, next) {
  const { user } = session;
  try {
    logger.info(user)
    session.destroy(err => {
      if (!err) res.render('logoutMain', { user: user })
      else res.send({ status: 'Logout ERROR', body: err })
    })
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export async function showForm(req, res, next) {
  try { // muestra el formulario de los productos
    res.render('formMain', { user: req.user });
    //El problema es que el objeto _id de Mongoose es de tipo ObjectId, 
    //y no se puede acceder a sus propiedades con notación de punto.
    // Para acceder a las propiedades del objeto _id, puedes utilizar la función toObject() de Mongoose.
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}