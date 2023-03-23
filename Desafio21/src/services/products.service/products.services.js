import { logger } from '../../config/pino.js';
import { Product } from '../../models/Products.js';
import { productsList } from '../../repositories/productsList/index.js';
// ACA DEBE ESTAR LA LOGICA DE LOS CONTROLADORES

export class ProductsService {

  async save(object) {
    const product = new Product(object)
    try {
      await productsList.save(product);// guarda objeto
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
    const product = new Product(object);
    product.id = id;
    try {
      await productsList.updateById(product);
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

  async deleteAll() {
    try {
      await productsList.deleteAll();
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}