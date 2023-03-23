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

  async save(prod) { // guarda O actualiza
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
      const products = [];
      // no hace falta transformarlo en objeto de negocios
      dtos.forEach(dto => {
        products.push(dto);
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

  async updateById(prod) {
    try {// retorna elemento modificado (hace falta?)
      await this.#dao.updateById(prod.id, prod.datos());
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async deleteById(id) {
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