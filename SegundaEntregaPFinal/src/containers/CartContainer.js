import * as fs from 'fs';
import { CART_ROUT } from '../config/config.js';

fs.promises.writeFile(CART_ROUT, '[]');

export class CartContainer {
  #cartObject;
  #file;
  constructor(file) {
    this.#file = file;
    this.#cartObject = {
      id: '',
      products: []
    };
  }

  async createCart(id) {
    try {
      this.#cartObject.id = id;
      await fs.promises.writeFile(this.#file, JSON.stringify(this.#cartObject));
    } catch (err) {
      throw (err);
    }
  }

  async saveObjectCart(id, object) {
    try {
      this.#cartObject = await this.getAll();
      if (this.#cartObject.id === id) {
        this.#cartObject.products.push(object);
        await fs.promises.writeFile(this.#file, JSON.stringify(this.#cartObject));
      }
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

  async deleteAllProducts(id) { // cambiar a deleteAll
    try {
      this.#cartObject = await this.getAll();
      if (this.#cartObject.id === id) {
        this.#cartObject.products = [];
        await fs.promises.writeFile(this.#file, JSON.stringify(this.#cartObject));
      }
    } catch (err) {
      throw err;
    }
  }

  async getAllProducts(id) {
    try {
      this.#cartObject = await this.getAll();
      if (this.#cartObject.id === id) {
        return this.#cartObject.products;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async deleteOneProdById(idCart, idProd) { //metodo correcto
    try {
      this.#cartObject = await this.getAll();
      if (this.#cartObject.id === idCart) {
        const searchObject = this.#cartObject.find(ele => ele.id === idProd);
        const index = this.#cartObject.products.indexOf(searchObject);
        if (index >= 0) {
          this.#cartObject.products.splice(index, 1);
        }
        await fs.promises.writeFile(this.#file, JSON.stringify(this.#cartObject));
      }
    } catch (err) {
      throw err;
    }
  }
}
