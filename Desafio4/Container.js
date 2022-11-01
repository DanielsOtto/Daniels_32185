const fs = require('fs').promises;

class Container {
  #file;
  #array;
  constructor(file) {
    this.#file = file;
    this.#array = [];
  }

  async save(obj) {
    try {
      this.#array.push(obj);
      await fs.writeFile(this.#file, JSON.stringify(this.#array));
    } catch (error) {
      throw new Error(`Ha ocurrido un error en el método save`);
    }
  }

  async getAll() {
    try {
      return JSON.parse(await fs.readFile(this.#file, 'utf-8'));
    } catch (error) {
      throw new Error('Ha ocurrido un error en el método getAll');
    }
  }

  async getById(id) {
    try {
      const array = JSON.parse(await fs.readFile(this.#file, 'utf-8'));
      const searchObject = array.find(obj => obj.id === id);
      if (!searchObject) {
        return null;
      }
      return searchObject;
    } catch (error) {
      throw new Error('Ha ocurrido un error en el método getById');
    }
  }

  async updateById(pos, object) {
    try {
      this.#array = JSON.parse(await fs.readFile(this.#file, 'utf-8'));
      this.#array.splice(pos, 1, object);
      await fs.writeFile(this.#file, JSON.stringify(this.#array));
    } catch (error) {
      throw new Error('Ha ocurrido un error en el método updateById');
    }
  }

  async deleteById(id) {
    try {
      const array = JSON.parse(await fs.readFile(this.#file, 'utf-8'));
      this.#array = array.filter(obj => obj.id !== id);
      await fs.writeFile(this.#file, JSON.stringify(this.#array));
    } catch (error) {
      throw new Error('Ha ocurrido un error en el método deleteById');
    }
  }

  async deleteAll() {
    try {
      this.#array = [];
      await fs.writeFile(this.#file, JSON.stringify(this.#array));
    } catch (error) {
      throw new Error('Ha ocurrido un error en el método deleteAll');
    }
  }
}

// // module.exports = Container;

const element = new Container('./fileBoxs.txt');
module.exports = element;

