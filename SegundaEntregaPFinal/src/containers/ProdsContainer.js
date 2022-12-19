import * as fs from 'fs';


export class ProductsContainer {
  #array;
  #file;
  constructor(file) {
    this.#file = file;
    this.#array = [];
  }

  async save(object) { // se llamaba save
    try {
      this.#array.push(object);
      await fs.promises.writeFile(this.#file, JSON.stringify(this.#array));
      return object;
    } catch (err) {
      console.log(err);
      throw new Error('Error al guardar el objeto');
    }
  }

  async getAll() {
    try {
      return JSON.parse(await fs.promises.readFile(this.#file, 'utf-8'));
    } catch (err) {
      console.log(err);
      throw new Error('Error al obtener el objeto');
    }
  }

  async getById(id) {
    try {
      const array = await this.getAll();
      const searchObject = array.find(obj => obj.id === id);
      if (searchObject) {
        return searchObject;
      }
      return null;
    } catch (err) {
      throw new Error({ errorMessage: err.message });
    }
  }

  async updateById(oldObject, object) {
    try {
      const array = await this.getAll();
      const index = array.findIndex(elem => elem.id === oldObject.id);
      console.log(index)
      if (index >= 0) {
        object.id = oldObject.id;
        array.splice(index, 1, object);
        await fs.promises.writeFile(this.#file, JSON.stringify(array));
      }
    } catch (err) {
      throw new Error({ errorMessage: err.message });
    }
  }

  async deleteById(object) {
    try {
      this.#array = await this.getAll();
      const index = this.#array.findIndex(ele => ele.id === object.id);
      if (index >= 0) {
        this.#array.splice(index, 1);
        await fs.promises.writeFile(this.#file, JSON.stringify(this.#array));
      }
    } catch (err) {
      console.log(err)
      throw new Error({ errorMessage: err.message });
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.#file, '[]');
    } catch (err) {
      throw new Error({ errorMessage: err.message });
    }
  }
}