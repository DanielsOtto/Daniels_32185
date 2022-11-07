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
      throw new Error('Error en el método save');
    }
  }

  async getAll() {
    try {
      return JSON.parse(await fs.readFile(this.#file, 'utf-8'));
    } catch (error) {
      throw new Error('Error en el método getAll');
    }
  }

  async getById(id) {
    try {
      this.#array = this.getAll()
      const searchObj = this.#array.find(obj => obj.id === id);
      if (!searchObj) {
        return null
      }
      return searchObj;
    } catch (error) {
      throw new Error('Error en el método getById');
    }
  }

  async deleteById(id) {
    try {
      const array = this.getAll();
      this.#array = array.filter(obj => obj.id !== id);
      await fs.writeFile(this.#file, JSON.stringify(this.#array));
    } catch (error) {
      throw new Error('Error en el método deleteById');
    }
  }

  async deleteAll() {
    try {
      this.#array = [];
      await fs.writeFile(this.#file, JSON.stringify(this.#array));
    } catch (error) {
      throw new Error('Error en el método deleteAll');
    }
  }
}

fs.writeFile('./fileBoxs.txt', []);
const element = new Container('./fileBoxs.txt');
module.exports = element;