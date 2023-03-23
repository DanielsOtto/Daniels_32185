import { productContainer } from '../containers/DataContainer.js'; // ACA NO
import { randomUUID } from 'crypto'; // ACA NO
// import { app } from '../server/Servidor.js'
import { logger } from '../config/pino.js';

//NO TIENE QUE TENER LOGICA - CAMBIAR DE NOMBRE ?

export async function showForm(req, res) {
  try { // desafio 13- agregado → { user: app.locals.user.toObject() }
    res.render('formMain', { user: req.user });
    //El problema es que el objeto _id de Mongoose es de tipo ObjectId, 
    //y no se puede acceder a sus propiedades con notación de punto.
    // Para acceder a las propiedades del objeto _id, puedes utilizar la función toObject() de Mongoose.
  } catch (error) {
    logger.error(error)
    throw new Error(error);
  }
}

export async function saveProduct({ body, io }, res) {
  try {
    const object = body;
    object.id = randomUUID();
    await productContainer.save(object);
    io.sockets.emit('updateProducts', await productContainer.getAll());
    res.status(201).json(object); // ojo con el orden, es como un return
    // res.redirect('/'); lo saco por q no me va a mostrar los mensajes cargados
    // el redirect hace que se recargue la pagina cuando se lo declara
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export async function recoverProducts(req, res) {
  try {
    const products = await productContainer.getAll();
    res.render('historial', { products, hayProductos: products.length > 0 });
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

//----------------------------------------
// Desafio 12 -- Cookies and Sessions

export async function showLogin({ session }, res) {
  try {
    session?.user ? res.render('formMain') : res.render('loginMain');
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export async function logOff({ session }, res) {
  try {
    logger.info(session.user)
    const user = session.user;
    session.destroy(err => {
      if (!err) res.render('logoutMain', { user: user })
      else res.send({ status: 'Logout ERROR', body: err })
    })
  } catch (err) {
    logger.error(err);
    throw err;
  }
}