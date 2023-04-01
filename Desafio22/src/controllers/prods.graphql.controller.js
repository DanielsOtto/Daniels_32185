import { randomUUID } from 'crypto';
import { logger } from '../config/pino.js';
import { productsService } from '../services/products.service/index.js';
// no hace falta la clase de validacion ?

export async function getProducts() {
  // const { key, value } = args;
  try {
    return await productsService.getAll();
  } catch (e) {
    logger.error(e);
  }
}

export async function getProduct(args) {
  const { id } = args;
  try {
    return await productsService.getById(id);
  } catch (e) {
    logger.error(e);
  }
}

export async function createProduct({ data }) {
  data.id = randomUUID();
  try {
    return await productsService.save(data);
  } catch (e) {
    logger.error(e);
  }
}

export async function updateProduct({ id, data }) {
  try {
    return await productsService.updateById(id, data);
  } catch (e) {
    logger.error(e);
    console.log(e.message);
  }
}

export async function deleteProduct({ id }) {
  try {
    return await productsService.deleteById(id);
  } catch (e) {
    logger.error(e);
  }
}