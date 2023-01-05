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