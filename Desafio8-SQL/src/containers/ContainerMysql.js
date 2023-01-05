export default class ContainerMysql {
  #client;
  #table;
  constructor(clienteMysql, myTable) {
    this.#client = clienteMysql;
    this.#table = myTable;
  }

  async save(object) {
    try {
      await this.#client(this.#table).insert(object); // operacion insert, inserta elementos en la tabla
    } catch (error) {
      // throw new Error('Error en el metodo save');
      throw new Error(error)
    }
  }

  async getAll() {
    try {
      return await this.#client(this.#table).select(); // operacion select, nos devuelve todos los registros
    } catch (error) {
      // throw new Error('Error en el metodo getAll')
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      const array = await this.getAll();
      return array.find(obj => obj.id === id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateById(id, object) {
    try {
      await this.#client(this.#table).update(object).where('id', id);
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      await this.#client(this.#table).delete();
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(id) {
    try {
      await this.#client(this.#table).delete().where('id', id);
    } catch (error) {
      throw new Error('Error en el metodo delete all');
    }
  }
}

