// que hace el repositorio ? RECIBE DATOS Y LOS GUARDA EN EL DTO
// el servicio LLAMA a los METODOS del repositorio

// ESTE ARCHIVO se usa en repositories/productsList/ProductsList.js
// index se usa en servicio y controllers llama a servicio
import { logger } from "../../config/pino.js";
import { Product } from '../../models/Products.js';

export class ProductsList {
  #dao;
  constructor(dao) {
    this.#dao = dao;
  }

  async save(object) { // guarda O actualiza
    const prod = new Product(object);
    try { // prod es un objeto NEGOCIO
      await this.#dao.getById(prod.id);
      await this.#dao.updateById(prod.id, prod.datos());
      logger.info('Product UPDATE!')
    } catch (e) {
      // si entra en error es porque no existe, por ende guarda
      await this.#dao.save(prod.datos());
      logger.info('Product SAVE!');
    }
  }

  async getAll() {
    try {
      const dtos = await this.#dao.getAll();
      const products = []
      dtos.forEach(dto => {
        const prod = new Product(dto)
        products.push(prod.datos());
      });
      return products;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async getById(id) {
    try {
      const dto = await this.#dao.getById(id);
      return new Product(dto);
    } catch (e) {
      logger.error(e.message);
      throw e;
    }
  }

  async updateById(id, object) {
    object.id = id;
    const product = new Product(object);
    try {// retorna elemento modificado
      await this.#dao.updateById(product.id, product.datos());
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async deleteById(id) {
    //este id se puede proteger ?
    try {
      await this.#dao.deleteById(id);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async deleteAll() {
    try {
      await this.#dao.deleteAll();
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

} 