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

  async updateById(id, data) {
    data.id = id;
    try {
      const product = await this.getById(id); // recupero prod original

      product.updateProduct(data)
      // // tendria q buscar el objeto ORIGINAL
      // // TENDRIA Q LLAMAR AL METODO UPDATE y pasarle la nueva DATA
      // ese producto lo mando a actualizar
      // no es un producto lo q tengo que crear, 
      //crear metodo para cambiar los productos, si creo metodo donde lo utilizo ?
      await productsList.updateById(product);
    } catch (err) {
      logger.error(err);
      console.log(err);
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