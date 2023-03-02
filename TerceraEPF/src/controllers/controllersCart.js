import { findByEmail } from '../models/userModel.js';
import { logger } from '../log/pino.js';
import {
  createCart,
  saveProdsInCart,
  deleteOneProduct,
  deleteProdsInCart,
  getAllProducts
} from '../models/cartModel.js';


// MIDDLEWARE QUE DEVUELVA EL USUARIO ?? 
async function returnUser(email) {
  try {
    const user = await findByEmail(email);
    if (!user) throw new Error('An error ocurred, user not found');

    return user;
  } catch (err) {
    logger.error(err.message);
    throw new Error(err.message);
  }
}

// post crea un carrito  con una lista vacia de productos
// y devuelve su id
async function createC(req, res) { //anda perfecto
  try {
    const id = await createCart();
    res.status(201);
    res.json({ 'Cart ID': id });
  } catch (err) {
    logger.error(err.message);
    throw new Error('Error creating cart');
  }
}


// por params nada - por body idProds + idCart MAL
// idCart no esta en el body, esta en el objeto USER, 
//solo tenemos el mail para buscarlo
async function addProducts({ body }, res) { // PROBADO - ANDA
  const { email, idProd } = body;
  try {
    const user = await returnUser(email);
    const { idCart } = user;
    await saveProdsInCart(idCart, idProd);
  } catch (err) {
    logger.error(err.message);
    throw new Error(err.message);
  }
  res.sendStatus(200);
}

// get -- listar los productos del carrito
async function showProducts({ body }, res) { // PROBADO -- ANDA
  const { email } = body;
  try {
    const user = await returnUser(email);
    const prods = await getAllProducts(user.idCart);

    if (prods.length === 0) {
      res.status(200).json({ Message: 'Your cart is empty' });
    } else {
      res.status(200).json(prods);
    }
  } catch (err) {
    logger.error(err.message);
    throw new Error('Error listing cart Products');
  }
}


//8b17072a-7696-44d4-9c07-5eaedf1fc0a7 CARRITO 
// delete - borra un producto, de un determinado carrito, ambos ID en params
export async function deleteOneProdCart({ body, params }, res) { // ANDA - PROBADO
  const { email } = body;
  const { id_prod } = params;
  try {
    const user = await returnUser(email);
    const { idCart } = user;
    await deleteOneProduct(idCart, id_prod);
    res.status(200).json({ message: "Deleted object" });
  } catch (err) {
    logger.error(err.message);
    return res.json({ Error: err.message });
  }
}


//8b17072a-7696-44d4-9c07-5eaedf1fc0a7 CARRITO 
//1bd64db3-8154-46d9-8156-2450da8500d5 PRODUCTO
// delete - borra los productos de un carrito, NO recibe el id por params
async function cleanCart({ body }, res) { // ANDA -- bien
  const { email } = body;
  try {
    const user = await returnUser(email);
    const { idCart } = user;
    await deleteProdsInCart(idCart);
  } catch (err) {
    logger.error(err.message);
    throw new Error(err.message);
  }
  res.sendStatus(200);
}


export { createC, addProducts, cleanCart, showProducts };