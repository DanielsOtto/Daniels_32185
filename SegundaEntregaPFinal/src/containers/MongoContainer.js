import { mongoDBase } from "../config/mongoClient.js";


export class MongoDBContainer {
  #collection;
  constructor(collectionName) {
    this.#collection = mongoDBase.collection(collectionName);
  }

  async save(object) { // guardar objeto - anda bien
    try {
      await this.#collection.insertOne(object);
    } catch (err) {
      console.log(err);
      throw new Error('Error al guardar en mongodb');
    }
    return object;
  }

  async getAll() { // obtener todo - anda bien 
    try {
      return await this.#collection.find({}).toArray(); // es necesario el objeto vacio ??
    } catch (err) {
      console.log(err);
      throw new Error('Error al obtener elementos en mongodb');
    }
  }

  async getById(id) { // anda bien
    try {
      return await this.#collection.findOne({ id: id });
    } catch (err) {
      console.log(err);
      throw new Error('Error al obtener un dato en mongodb');
    }
  }

  async updateById(oldObject, obj) { // anda bien
    try {
      await this.#collection.updateOne(oldObject, { $set: obj }); // corregir "metodo coleccion.updateById ?"
    } catch (err) {
      console.log(err);
      throw new Error('Error al actualizar un dato en mongodb');
    }
  }

  async deleteById(object) {
    try {
      await this.#collection.deleteOne({ id: object.id });
    } catch (err) {
      console.log(err);
      throw new Error('Error al eliminar un dato en mongodb');
    }
  }

  async deleteAll() {
    try {
      await this.#collection.deleteMany({});
      // borra toda la coleccion con un objeto literal vacio
    } catch (err) {
      console.log(err);
      throw new Error('Error al intentear eliminar todos los datos, en mongodb');
    }
  }

  // async getAllProducts(id = {}) { // para carrito
  //   try {
  //     const object = await this.getAll(id);
  //     if (object) {
  //       return object.products;
  //     }
  //     return null;
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // async createCart(id) { // carrito unico
  //   try {
  //     const obj = {
  //       _id: id,
  //       products: []
  //     };
  //     await this.#collection.insertOne(obj);
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // async saveObjectProd(object) { // prod, podria ser el mismo ?
  //   try {
  //     await this.#collection.insertOne(object);
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // async saveObjectCart(obj) { // me encanta
  //   try {
  //     const object = await this.#collection.getAll();
  //     object.products.push[obj];
  //     await this.#collection.insertOne(object);
  //   } catch (err) {
  //     throw err;
  //   }
  // }
  //  async deleteOneProdById(idCart, idProd) { // solo carrito
  //     try {
  //       const cartObj = await this.getAll();
  //       if (cartObj._id === idCart) {
  //         const searchObject = cartObj.products.find(el => el.id === idProd);
  //         const index = cartObj.products.indexOf(searchObject)
  //         if (index >= 0) {
  //           cartObj.products.splice(index, 1);
  //         }
  //       }
  //     } catch (err) {
  //       throw err;
  //     }
  //   }

}