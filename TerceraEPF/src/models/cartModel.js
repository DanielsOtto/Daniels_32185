import { randomUUID } from 'crypto';
import { chosenCartContainer, chosenProdsContainer } from '../dao/DataContainer.js';
import { logger } from '../log/pino.js';

// ---- CART MODEL ES USADO POR EL CONTROLADOR  ---- 

// post crea un carrito  con una lista vacia de productos
// y devuelve su id
export async function createCart() { // me encanta --bien
  try {
    const idRandom = randomUUID();
    const cart = {
      id: idRandom,
      products: []
    }
    const saved = await chosenCartContainer.save(cart);
    return saved.id;
  } catch (err) {
    logger.error(err);
    throw new Error('Error al crear el carrito');
  }
}

//para incorporar productos al carrito, necesitamos le id del producto
export async function saveProdsInCart(idCart, idProd) { // REVISADO --- JOYA
  let newArray = [];
  try {
    const product = await chosenProdsContainer.getById(idProd); // busca el producto
    const cart = await chosenCartContainer.getById(idCart); // busca el carrito
    if (!cart) throw new Error('El carrito no se encuentra')

    if (cart.products.length > 0) newArray = cart.products.slice();

    newArray.push(product);
    const updateCart = {
      id: cart.id,
      products: newArray.slice()
    };
    await chosenCartContainer.updateByObject(cart, updateCart); // andara asi ? NO
  } catch (err) {
    logger.error(err);
    throw new Error('Error al guardar productos en el carrito');
  }
}

//para visualizar los productos que hay en el carrito
export async function getAllProducts(idCart) {
  try {
    const cart = await chosenCartContainer.getById(idCart);
    return cart.products;
  } catch (err) {
    logger.error(err);
    throw new Error('Error al visualizar los productos del carrito');
  }
}


// Eliminar un solo articulo del carrito, obtiene ambos ID por params
export async function deleteOneProduct(idCart, idProd) {  // NO ANDA
  try {
    const cart = await chosenCartContainer.getById(idCart);
    const newCart = {
      id: cart.id,
      products: cart.products.slice()
    };

    const obj_index = newCart.products.findIndex(obj => obj.id === idProd);
    if (obj_index >= 0) {
      newCart.products.splice(obj_index, 1);
    } else {
      throw new Error("Product ID incorrect.");
    }

    await chosenCartContainer.updateByObject(cart, newCart);
  } catch (err) {
    logger.error(err);
    throw new Error(err.message);
  }
}


// delete -- vaciar el carrito -- recibe id_carrito
export async function deleteProdsInCart(idCart) {
  try {
    const cart = await chosenCartContainer.getById(idCart);
    if (cart) { //agregado martes 20/12
      const updateCart = {
        id: cart.id,
        products: []
      };
      await chosenCartContainer.updateByObject(cart, updateCart);
    }
  } catch (err) {
    logger.error(err);
    throw new Error('Error al borrar los productos de un carrito');
  }
}