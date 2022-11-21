import * as fs from 'fs';

class ContainerProds {
  #array;
  #file;
  constructor(file) {
    this.#file = file;
    this.#array = [];
  }

  async save(object) {
    try {
      this.#array.push(object);
      await fs.promises.writeFile(this.#file, JSON.stringify(this.#array));
    } catch (error) {
      throw new Error('Se ha producido un error en el método save');
    }
  }

  async getAll() {
    try {
      return JSON.parse(await fs.promises.readFile(this.#file, 'utf-8'));
    } catch (error) {
      throw new Error('Se ha producido un error en el método getAll');
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
    } catch (error) {
      throw new Error('Se ha producido un error en el método getById');
    }
  }

  async updateById(id, object) {
    try {
      const array = await this.getAll();
      const searchObject = array.find(obj => obj.id === id);
      let index = array.indexOf(searchObject);
      console.log(index)
      if (index >= 0) {
        object.id = searchObject.id;
        array.splice(index, 1, object);
        await fs.promises.writeFile(this.#file, JSON.stringify(array));
      }
    } catch (error) {
      throw new Error('Se ha producido un error en el método updateById');
    }
  }

  async deleteById(id) {
    try {
      this.#array = await this.getAll();
      const searchObject = this.#array.find(obj => obj.id === id);
      let index = this.#array.indexOf(searchObject);
      if (index >= 0) {
        this.#array.splice(index, 1);
      }
      await fs.promises.writeFile(this.#file, JSON.stringify(this.#array));
    } catch (error) {
      throw new Error('Se ha producido un error en el método deleteById');
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.#file, JSON.stringify(this.#array));
    } catch (error) {
      throw new Error('Se ha producido un error en el método deleteAll');
    }
  }
}

fs.promises.writeFile('./products.txt', '[]');
const products = new ContainerProds('products.txt');
export default products;