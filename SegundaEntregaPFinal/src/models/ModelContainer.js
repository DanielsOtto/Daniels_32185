import { chosenCartContainer, chosenProdsContainer } from '../containers/DataContainer.js';

function validations(object) {

  // para los atributos del objeto de productos


}

class ModelContainer {
  #prodsContainer;
  #cartContainer;
  constructor() {
    this.#prodsContainer = chosenProdsContainer; // podria ser uno solo ? 
    this.#cartContainer = chosenCartContainer;
  }

  async createCart(id) {
    try {
      await this.#cartContainer.createCart(id); // en mongodb/files el metodo se llama igual
    } catch (err) {
      throw err;
    }
  }

  async saveProds(object) {
    try {
      await this.#prodsContainer.saveObjectProd(object);
    } catch (err) {
      throw err;
    }
  }

  async saveCart(obj) {
    try {
      await this.#cartContainer.saveObjectCart(obj);
    } catch (err) {
      throw err;
    }
  }

  async getAllProds() {
    try {
      const prods = await this.#prodsContainer.getAll();
      return prods;
    } catch (err) {
      throw err;
    }
  }

  async getAllCarts(id) {
    try {
      const carts = await this.#cartContainer.getAllProducts(id); // mandamos el id del carrito, y obtenemos todos los prods del carrito
      return carts;
    } catch (err) {
      throw err;
    }
  }

  async getByIdProd(id) {
    try {
      const prod = await this.#prodsContainer.getById(id);
      return prod;
    } catch (err) {
      throw err;
    }
  }

  async getByIdCart(id) {
    try {
      return await this.#cartContainer.getById(id);
    } catch (err) {
      throw err;
    }
  }

  async getUpdateByIdProd(id, object) {
    try {
      await this.#prodsContainer.updateById(id, object); // no retorna nada updateById
    } catch (err) {
      throw err;
    }
  }
  //carrito no tiene update

  async deleteAllProds() {
    try {
      await this.#prodsContainer.deleteAll();
    } catch (err) {
      throw err;
    }
  }

  async deleteAllCarts(id) {
    try { // en el carrito borra los prods de un carrito segun su id
      await this.#cartContainer.deleteAll(id);
    } catch (err) {
      throw err;
    }
  }

  async deleteByIdProds(id) {
    try {
      await this.#prodsContainer.deleteById(id);
    } catch (err) {
      throw err;
    }
  }

  async deleteByIdCart(id) {
    try {
      await this.#cartContainer.deleteOneProdById(id);
    } catch (err) {
      throw err;
    }
  }
}

export const ModelContainer = new ModelContainer();