import {
  createCart,
  saveProdsInCart,
  deleteOneProduct,
  deleteProdsInCart,
  getAllProducts
} from '../models/cartModel.js';


// post crea un carrito  con una lista vacia de productos
// y devuelve su id
async function createC(req, res) { //anda perfecto
  try {
    const id = await createCart();
    res.status(201);
    res.json({ 'Cart ID': id });
  } catch (err) {
    console.log(err);
    throw new Error('Error al crear el carrito');
  }
}

// por params idCart - por body idProds
async function addProducts({ body, params }, res) { //perfecto
  const id = body.id;
  try {
    await saveProdsInCart(id, params.id_cart);
  } catch (err) {
    console.log(err);
    throw new Error('Error al cargar productos en el carrito');
  }
  res.sendStatus(200);
}

// delete - borra los productos de un carrito, recibe el id por params
async function cleanCart({ params }, res) {
  try {
    await deleteProdsInCart(params.id_cart);
  } catch (err) {
    console.log(err);
    throw new Error('Error al vaciar el carrito');
  }
  res.sendStatus(200);
}

// get -- listar los productos del carrito
async function showProducts({ params }, res) { //perfecto
  try {
    const prods = await getAllProducts(params.id_cart);
    if (!prods) {
      res.status(404);
      res.json({ Message: 'ID carrito incorrecto' });
    } else {
      res.status(201);
      res.json(prods);
    }
  } catch (err) {
    console.log(err);
    throw new Error('Error al listar los productos del carrito');
  }
}

// delete - borra un producto, de un determinado carrito, ambos ID en params
async function deleteOneP({ params }, res) {
  try {
    await deleteOneProduct(params.id_cart, params.id_prod);
  } catch (err) {
    console.log(err);
    throw new Error('No se ha podido eliminar el producto del carrito');
  }
  res.sendStatus(200);
}


export { createC, addProducts, cleanCart, showProducts, deleteOneP };