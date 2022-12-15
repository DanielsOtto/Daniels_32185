import * as fs from 'fs';
import { RUTA } from '../config/config.js';



// fs.promises.writeFile(RUTA, '[]');

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
    } catch (err) {
      throw err;
    }
  }

  async getAll() {
    try {
      return JSON.parse(await fs.promises.readFile(this.#file, 'utf-8'));
    } catch (err) {
      throw err;
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
      throw err;
    }
  }

  async updateById(oldObject, object) {
    try {
      const array = await this.getAll();
      // const searchObject = array.find(obj => obj.id === id);
      // const index = array.indexOf(searchObject);
      const index = array.indexOf(oldObject);
      if (index >= 0) {
        object.id = searchObject.id;
        array.splice(index, 1, object);
        await fs.promises.writeFile(this.#file, JSON.stringify(array));
      }
    } catch (err) {
      throw err;
    }
  }

  async deleteById(object) {
    try {
      this.#array = await this.getAll();
      // const searchObject = this.#array.find(obj => obj.id === id);
      // const index = this.#array.indexOf(searchObject);
      const index = this.#array.indexOf(object);
      if (index >= 0) {
        this.#array.splice(index, 1);
      }
      await fs.promises.writeFile(this.#file, JSON.stringify(this.#array));
    } catch (err) {
      throw err;
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.#file, '[]');
    } catch (err) {
      throw err;
    }
  }
}