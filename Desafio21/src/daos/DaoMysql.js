import { logger } from "../config/pino.js";

export class DaoMysql { // tiene q ser igual al model DaoMongoDb
  #client;
  #table;
  constructor(clientMysql, myTable) {
    this.#client = clientMysql;
    this.#table = myTable;
  }

  async save(object) {
    try {
      await this.#client(this.#table).insert(object);
    } catch (err) {
      logger.error(err);
      throw new Error('Error al guardar un objeto en mysql');
    }
  }

  async getAll() {
    try {
      const items = await this.#client(this.#table).select(); // select() devuelve todos los objetos
      if (!items) throw new Error('Error al obtener los objetos de mysql');
      return items;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async getById(id) {
    try {
      const item = await this.#client(this.#table).select().where('id', id); // creo que se usa asi
      if (!item) throw new Error('Error al obtener un objeto mediante el ID');
      return item;
    } catch (err) {
      logger.error(err);
      throw err
    }
  }

  async updateById(id, object) {
    try {
      await this.#client(this.#table).update(object).where('id', id);
    } catch (err) {
      logger.error(err);
      throw new Error('Error al actualizar un objeto mediante su ID');
    }
  }

  async deleteAll() {
    try {
      await this.#client(this.#table).delete();
    } catch (err) {
      logger.error(err);
      throw new Error('Error al eliminar todos los objetos');
    }
  }

  async deleteById() {
    try {
      await this.#client(this.#table).delete().where('id', id);
    } catch (err) {
      logger.error(err);
      throw new Error('Error al eliminar un objeto por su ID');
    }
  }
}