export default class mySqlContainer {
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
      console.log(err)
      // throw new Error('Error al guardar un objeto en mysql');
    }
  }

  async getAll() {
    try {
      return await this.#client(this.#table).select(); // select() devuelve todos los objetos
    } catch (err) {
      console.log(err)
      throw new Error('Error al obtener los objetos de mysql');
    }
  }

  async getById(id) {
    try {
      return await this.#client(this.#table).select().where('id', id); // creo que se usa asi
    } catch (err) {
      console.log(err)
      throw new Error('Error al obtener un objeto mediante el ID');
    }
  }

  async updateById(id, object) {
    try {
      await this.#client(this.#table).update(object).where('id', id);
    } catch (err) {
      console.log(err)
      throw new Error('Error al actualizar un objeto mediante su ID');
    }
  }

  async deleteAll() {
    try {
      await this.#client(this.#table).delete();
    } catch (err) {
      console.log(err)
      throw new Error('Error al eliminar todos los objetos');
    }
  }

  async deleteById() {
    try {
      await this.#client(this.#table).delete().where('id', id);
    } catch (err) {
      console.log(err)
      throw new Error('Error al eliminar un objeto por su ID');
    }
  }
}