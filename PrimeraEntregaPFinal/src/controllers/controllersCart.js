import cart from '../containers/ContainerCart.js';
import products from '../containers/ContainerProds.js';
import { randomUUID } from 'crypto';

async function postCreateCart(req, res) { // crea un carrito y devuelve su id
  try {
    let id = randomUUID();
    await cart.createCart(id);
    res.status(201);
    res.json({ 'Cart ID': id });
  } catch (error) {
    throw new Error('Error en el controlador postCreateCart');
  }
}

async function postAddProducts({ body, params }, res) {
  try {
    const product = await products.getById(body.id);
    if (product) {
      await cart.save(params.id_cart, product);
      res.json(product);
    } else {
      res.status(404);
      res.json({ message: 'product not found' });
    }
  } catch (error) {
    throw new Error('Error en el controlador postAddProducts');
  }
}

async function deleteAllProducts({ params }, res) {
  try {
    await cart.deleteProducts(params.id_cart);
    res.json({ message: 'deleted object' });
  } catch (error) {
    throw new Error('Error en el controlador deleteAllProducts');
  }
}

async function getCartProducts({ params }, res) {
  try {
    const listProducts = await cart.getAllProducts(params.id_cart);
    if (listProducts) {
      res.status(201);
      res.json(listProducts);
    } else {
      res.status(404);
      res.json({ message: 'Wrong ID' });
    }
  } catch (error) {
    throw new Error('Error en el controlador getCartProducts');
  }
}

async function deleteOneProductById({ params }, res) {
  try {
    await cart.deleteOneProdById(params.id_cart, params.id_prod);
    res.json({ message: 'deleted object' });
  } catch (error) {
    throw new Error('Error en el controlador deleteOneProductById');
  }
}

function notFound(req, res) {
  try {
    res.status(404).json({ Message: 'Page not found', 'Wrong route': req.path, Method: req.method });
  } catch (error) {
    throw new Error('Error en el controlador notFound');
  }
}

export { postCreateCart, postAddProducts, deleteAllProducts, getCartProducts, deleteOneProductById, notFound };