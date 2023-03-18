import { mongoDBase } from "../config/mongoClient.js";
import { logger } from "../log/pino.js";


export class MongoDBContainer {
  #collection;
  constructor(collectionName) {
    this.#collection = mongoDBase.collection(collectionName);
  }

  async save(object) { // guardar objeto - anda bien
    try {
      await this.#collection.insertOne(object);
    } catch (err) {
      logger.error(err);
      throw new Error('Error saving to mongodb!');
    }
    return object;
  }

  async getAll() { // obtener todo - anda bien 
    try {
      const all = await this.#collection.find({}).toArray(); // es necesario el objeto vacio ??
      // if (!all) throw new Error('Error when trying to retrieve objects. MongoDB!');
      return all;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async getOne(item) { // anda  ??
    try {
      const one = await this.#collection.findOne({ item: item });
      // if (!one) throw new Error('Error when trying to retrieve one object. MongoDB!');
      return one;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async getByEmail(email, throwIfNotFound = true) { // anda bien
    try {
      const user = await this.#collection.findOne({ email: email });
      // if (!user) throw new Error('Error when trying to retrieve an user via mail. MongoDB!');
      // if (!user && throwIfNotFound) {
      //   throw new Error('Error when trying to retrieve an user via mail. MongoDB!');
      // } // MUY BUENO, pero hay q pensarlo un poco mas
      return user;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async getById(id, throwIfNotFound = true) { // anda bien
    try {
      const object = await this.#collection.findOne({ id: id });
      // if (!object) throw new Error('Error when trying to retrieve an object via ID. MongoDB!');


      // if (!object && throwIfNotFound) {
      //   throw new Error('Error when trying to retrieve an object via ID. MongoDB!');
      // }

      return object;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async updateByObject(oldObject, newObj) {//anda bien
    // devuelve un objeto que contiene información sobre el resultado de la operación de actualización, y si la operación no se realizó correctamente, este objeto tendría un valor de null.
    try {
      return await this.#collection.updateOne(oldObject, { $set: newObj });
    } catch (err) {
      logger.error(err);
      throw new Error('ERROR. Cant update objects. MongoDB!');
    }
  }

  async updateById(id, update) {  // REVISAR !! 01/03/23
    try {
      const result = await this.#collection.updateOne({ id: id }, { $set: update });
      logger.info(`Actualizados ${result.modifiedCount} documentos.`);
      return result.modifiedCount;
    } catch (err) {
      logger.error(err);
      throw new Error('ERROR. Cant update objects. MongoDB!');
    }
  }


  async deleteById(object) {
    try {
      await this.#collection.deleteOne({ id: object.id });
    } catch (err) {
      logger.error(err);
      throw new Error('Error. Cant delete the object via ID. MongoDB!');
    }
  }

  async deleteAll() {
    try {
      await this.#collection.deleteMany({});
      // borra toda la coleccion con un objeto literal vacio
    } catch (err) {
      logger.error(err);
      throw new Error('Error. Cant delete the objects. MongoDB!');
    }
  }
}