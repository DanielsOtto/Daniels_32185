// import { productContainer } from '../containers/ProductsContainer.js';
import { productContainer } from '../containers/DataContainer.js';
import { randomUUID } from 'crypto';


export async function showForm(req, res) {
  try {
    res.render('formMain');
  } catch (error) {
    throw new Error('Error al cargar el formulario');
  }
}

export async function saveProduct({ body, io }, res) {
  try {
    const object = body;
    object.id = randomUUID();
    await productContainer.save(object);
    io.sockets.emit('updateProducts', await productContainer.getAll());
    res.status(201);
    res.json(object); // ojo con el orden, es como un return
    // res.redirect('/'); lo saco por q no me va a mostrar los mensajes cargados
    // el redirect hace que se recargue la pagina cuando se lo declara
  } catch (err) {
    throw new Error('Se ha producido un error en el controlador POST.');
  }
}

export async function recoverProducts(req, res) {
  try {
    const products = await productContainer.getAll();
    res.render('historial', { products, hayProductos: products.length > 0 });
  } catch (err) {
    throw new Error('Se ha producido un error en el controlador GET.');
  }
}

//----------------------------------------
// Desafio 12 -- Cookies and Sessions


export async function showLogin({ session }, res) {
  try {
    session?.user ? res.render('formMain') : res.render('loginMain');
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

export async function register({ body, session }, res) {
  try {
    session.user = body.name;
    session.admin = true;
    console.log(session.user)
    // res.send(session)
    if (session.user === 'cleopatra') {
      res.status(200);
      res.render('formMain', { user: session.user });
    } else {
      res.render('loginMain');
    }
  } catch (err) {
    console.log(err)
    throw new Error('Se ha producido un error al registrarse');
  }
}

// export async function validateUser({ session }, res, next) {
//   try {
//     if (!session.admin) {
//       res.status(401);
//     } else {
//       next();
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

// export async function onlyAdmins(req, res) {
//   try {
//     res.status(200)
//     res.send('usted es un admin')
//   } catch (err) {
//     console.log(err)
//     throw new Error('Se ha producido un error al ingresar.')
//   }
// }  NO LO USO

export async function logOff({ session }, res) {
  try {
    console.log(session.user)
    const user = session.user;
    session.destroy(err => {
      if (!err) res.render('logoutMain', { user: user })
      else res.send({ status: 'Logout ERROR', body: err })
    })
  } catch (err) {
    console.log(err)
    throw new Error('Se ha producido un error al desconectarse');
  }
}