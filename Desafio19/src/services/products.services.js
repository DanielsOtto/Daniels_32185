import { productContainer } from '../containers/DataContainer.js';
import { randomUUID } from 'crypto';
import { logger } from '../config/pino.js';

export async function putProducts(item) {
  item.id = randomUUID();
  try {
    await productContainer.save(item);
    return item;
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export async function getAllProducts() {
  try {
    return await productContainer.getAll();
  } catch (err) {
    logger.error(err);
    throw err;
  }
}