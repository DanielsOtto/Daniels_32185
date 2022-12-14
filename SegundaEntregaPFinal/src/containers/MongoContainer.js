import { mongoDBase } from "../config/mongoClient.js";


export class MongoDBContainer {
  #collection;
  constructor(collectionName) {
    this.#collection = mongoDBase.collection(collectionName);
  }

  async createCart(id) { // carrito unico
    try {
      const obj = {
        _id: id,
        products: []
      };
      await this.#collection.insertOne(obj);
    } catch (err) {
      throw err;
    }
  }

  async saveObjectProd(object) { // prod, podria ser el mismo ?
    try {
      await this.#collection.insertOne(object);
    } catch (err) {
      throw err;
    }
  }

  async saveObjectCart(obj) { // me encanta
    try {
      const object = await this.#collection.getAll();
      object.products.push[obj];
      await this.#collection.insertOne(object);
    } catch (err) {
      throw err;
    }
  }

  async getAll() { // uno para los dos, el mismo
    try {
      return await this.#collection.find({}).toArray();
    } catch (err) {
      throw err;
    }
  }

  async getAllProducts(id = {}) { // para carrito
    try {
      const object = await this.getAll(id);
      if (object) {
        return object.products;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async getById(id) { // para ambos
    try {
      return await this.#collection.find(id) // anda asi ??  o es findOne ?
      // hay q transformarlo en objeto desde el otro lado!
    } catch (err) {
      throw err;
    }
  }

  async getUpdateByIdProd(id) { // solo prods
    try {
      await this.#collection.updateById(id);
    } catch (err) {
      throw err;
    }
  }

  async deleteById(id) { // solo prod
    try {
      await this.#collection.deleteOne(id);
    } catch (err) {
      throw err;
    }
  }

  async deleteOneProdById(idCart, idProd) { // solo carrito
    try {
      const cartObj = await this.getAll();
      if (cartObj._id === idCart) {
        const searchObject = cartObj.products.find(el => el.id === idProd);
        const index = cartObj.products.indexOf(searchObject)
        if (index >= 0) {
          cartObj.products.splice(index, 1);
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async deleteAll(id = {}) { // el mismo para ambos, en carrito borra un array de carrito, en productos todo
    try {
      await this.#collection.deleteMany(id);
    } catch (err) {
      throw err;
    }
  }
}