import { randomUUID } from 'crypto';
import { logger } from '../../config/pino.js';
// utiliza al repositorio
import { productsList } from '../../repositories/productsList/index.js';
// import { Product } from '../../models/Products.js';
// ACA DEBE ESTAR LA LOGICA DE LOS CONTROLADORES


export class ProductsService {

  async save(object) {
    object.id = randomUUID();
    try {
      await productsList.save(object);// guarda objeto
      return object;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async getAll() {
    try {
      return await productsList.getAll();
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async getById(id) {
    try {
      return await productsList.getById(id);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async updateById(id, object) {
    object.id = id;
    try {// object es privado, necesitamos mandar datos()
      await productsList.updateById(id, object);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async deleteAll() {
    try {
      await productsList.deleteAll();
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
  async deleteById(id) {
    try {
      await productsList.deleteById(id);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}



// no van mas estos metodos
export async function putProducts(item) {
  item.id = randomUUID();
  try {
    await productsList.save(item);
    return item;
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export async function getAllProducts() {
  try {
    return await productsList.getAll();
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

