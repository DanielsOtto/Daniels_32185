import { logger } from '../config/pino.js';
import { InvalidArgument } from '../errors/InvalidArgumentError.js';
import { IdNotFoundError } from '../errors/IdNotFoundError.js';
import { OutOfStockError } from '../errors/OutOfStockError.js'; // aca no
import { EmptyCollection } from '../errors/EmptyCollection.js';
// DESAFIO 20

// ESTE ARCHIVO SE USA EN repositorios/productsList/index.js
// index se usa en servicio y controllers llama a servicio

// ACA VAN LAS VALIDACIONES -- 
// USAR TRY CATCH para el manejo de errores

// DAO SIEMPRE DEVUELVE DTO

export class DaoMongoDb { // sin default. no se bien xq
  #collection;
  constructor(collection) {
    this.#collection = collection;
  }

  async save(dto) {
    try {
      await this.#collection.insertOne(dto);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async getAll() {
    try {
      const dtos = await this.#collection.find().toArray();
      if (!dtos) throw new EmptyCollection(dtos);
      return dtos;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async getById(id) {
    try {
      const dto = await this.#collection.findOne({ id: id });
      if (!dto) throw new IdNotFoundError(id);
      return dto;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async updateById(id, dto) {
    try {

      const result = await this.#collection.replaceOne({ id }, dto);
      if (!result.acknowledged) throw new Error('Error updating product.');
      if (result.matchedCount === 0) throw new IdNotFoundError(id);
      if (result.modifiedCount === 0) throw new Error('The product was not modified.');
    } catch (err) {
      logger.error(err.message);
      console.log(err);
      throw err.message;
    }
  }

  async deleteById(id) {
    try {
      const object = await this.getById(id);
      const result = await this.#collection.deleteOne({ id });
      if (!result.acknowledged) throw new Error('Error deleting product.');
      if (result.deletedCount === 0) throw new Error('The product was not remove.');
      return object;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async deleteAll() {
    try {
      const result = await this.#collection.deleteMany({}); // con el obj vacio borra todo
      console.log(result);
      if (!result.acknowledged) throw new Error('Error deleting products.');
      if (result.deletedCount === 0) throw new Error('The products were not remove.');
    } catch (err) {
      logger.error(err.message);
      throw err.message;
    }
  }
}