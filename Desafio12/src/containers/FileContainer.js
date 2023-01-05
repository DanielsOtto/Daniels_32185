import * as fs from 'fs';
import { PATH } from '../config/config.js';

export default class FileContainer {
  #file;
  #array;
  constructor(path) {
    this.#file = path;
    this.#array = [];
  }

  async save(object) {
    this.#array.push(object);
    try {
      await fs.promises.writeFile(this.#file, JSON.stringify(this.#array));
    } catch (err) {
      console.log(err);
      throw new Error('Error al guardar');
    }
  }

  async getAll() {
    try {
      return JSON.parse(await fs.promises.readFile(this.#file, 'utf-8'));
    } catch (err) {
      console.log(err);
      throw new Error('Error al obtener todos');
    }
  }

  async getById(id) {
    try {
      this.#array = await this.getAll();
      const searchObject = this.#array.find(element => element.id === id);
      if (!searchObject) {
        return null;
      }
      return searchObject;
    } catch (err) {
      console.log(err);
      throw new Error('Error al obtener por ID');
    }
  }

  async updateById(id, object) {
    try {
      this.#array = await this.getAll();
      const objectWithId = this.#array.find(obj => obj.id === id);
      const index = this.#array.findIndex(obj => obj.id === id);
      object.id = objectWithId.id;
      if (index === -1) {
        return null;
      }
      this.#array.splice(index, 1, object);
      await fs.promises.writeFile(this.#file, JSON.stringify(this.#array));
      return object;
    } catch (err) {
      console.log(err);
      throw new Error('Error al actualizar por ID');
    }
  }

  async deleteAll() {
    try {
      await fs.promises.unlink(this.#file);
    } catch (err) {
      console.log(err);
      throw new Error('Error al eliminar todo');
    }
  }

  async deleteById(id) {
    try {
      this.#array = await this.getAll();
      const index = this.#array.findIndex(element => element.id === id);
      if (index >= 0) {
        this.#array.splice(index, 1);
      }
      await fs.promises.writeFile(this.#file, JSON.stringify(this.#array));
    } catch (err) {
      console.log(err);
      throw new Error('Error al eliminar por ID');
    }
  }
}

