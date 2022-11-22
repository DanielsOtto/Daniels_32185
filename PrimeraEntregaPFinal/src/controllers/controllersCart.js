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
    // throw new Error(error);
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
    // throw new Error(error);
  }
}

async function deleteOneProductById({ params }, res) {
  try {
    console.log(params)
    console.log(params.id_cart)
    console.log(params.id_prod)
    await cart.deleteOneProdById(params.id_cart, params.id_prod);
    res.json({ message: 'deleted object' });
  } catch (error) {
    // throw new Error('Error en el controlador deleteOneProductById');
    throw new Error(error);
  }
}

export { postCreateCart, postAddProducts, deleteAllProducts, getCartProducts, deleteOneProductById };