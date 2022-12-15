import { chosenCartContainer, chosenProdsContainer } from '../containers/DataContainer.js';
import { randomUUID } from 'crypto';


// post crea un carrito  con una lista vacia de productos
// y devuelve su id
export async function createCart() { // me encanta --bien
  try {
    const idRandom = randomUUID();
    const cart = {
      id: idRandom,
      products: []
    }
    await chosenCartContainer.save(cart);
    return idRandom;
  } catch (err) {
    console.log(err);
    throw new Error('Error al crear el carrito');
  }
}

//para incorporar productos al carrito, necesitamos le id del producto
export async function saveProdsInCart(idProd, idCart) {
  try {
    const product = await chosenProdsContainer.getById(idProd);
    const cart = await chosenCartContainer.getById(idCart);
    const newArray = cart.products.slice();
    newArray.push(product);
    const updateCart = {
      id: cart.id,
      products: newArray.slice()
    };
    await chosenCartContainer.updateById(cart, updateCart); // andara asi ?
  } catch (err) {
    console.log(err);
    throw new Error('Error al guardar productos en el carrito');
  }
}

// delete -- vaciar el carrito -- recibe id_carrito
export async function deleteProdsInCart(idCart) {
  try {
    const cart = await chosenCartContainer.getById(idCart);
    const updateCart = {
      id: cart.id,
      products: []
    };
    await chosenCartContainer.updateById(cart, updateCart);
  } catch (err) {
    console.log(err);
    throw new Error('Error al borrar los productos de un carrito');
  }
}

//para visualizar los productos que hay en el carrito
export async function getAllProducts(idCart) {
  try {
    const cart = await chosenCartContainer.getById(idCart);
    return cart.products;
  } catch (err) {
    console.log(err);
    throw new Error('Error al visualizar los productos del carrito');
  }
}

// Eliminar un solo articulo del carrito, obtiene ambos ID por params
export async function deleteOneProduct(idCart, idProd) {
  try {
    const cart = await chosenCartContainer.getById(idCart);
    const array = cart.products.filter(ele => ele.id !== idProd);
    const newCart = {
      id: cart.id,
      products: array.slice()
    }
    await chosenCartContainer.updateById(cart, newCart);
  } catch (err) {
    console.log(err);
    throw new Error('Error al intentar eliminar un producto del carrito');
  }
}