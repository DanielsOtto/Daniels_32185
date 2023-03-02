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
      throw new Error('Error al guardar en mongodb');
    }
    return object;
  }

  async getAll() { // obtener todo - anda bien 
    try {
      return await this.#collection.find({}).toArray(); // es necesario el objeto vacio ??
    } catch (err) {
      logger.error(err);
      throw new Error('Error al obtener elementos en mongodb');
    }
  }

  async getOne(item) { // anda  ??
    try {
      return await this.#collection.findOne({ item: item });
    } catch (err) {
      logger.error(err);
      throw new Error('Error al obtener un dato en mongodb');
    }
  }

  async getByEmail(email) { // anda bien
    try {
      return await this.#collection.findOne({ email: email });
    } catch (err) {
      logger.error(err);
      throw new Error('Error al obtener un dato en mongodb');
    }
  }

  async getById(id) { // anda bien
    try {
      const object = await this.#collection.findOne({ id: id });
      return object;
    } catch (err) {
      logger.error(err);
      throw new Error('Error al obtener un dato en mongodb');
    }
  }

  async updateByObject(oldObject, newObj) { // anda bien
    try {
      console.log("UPDATE BY OBJECT");
      console.log("OLD: ", oldObject);
      console.log("NEW: ", newObj);
      return await this.#collection.updateOne(oldObject, { $set: newObj }); // corregir "metodo coleccion.updateById ?"
    } catch (err) {
      logger.error(err);
      throw new Error('ERROR. Cant update objects');
    }
  }

  async updateById(id, update) {  // REVISAR !! 01/03/23
    try {
      const result = await this.#collection.updateOne({ id: id }, { $set: update });
      console.log(`Actualizados ${result.modifiedCount} documentos.`);
      return result.modifiedCount;
    } catch (err) {
      logger.error(err);
      throw new Error('Error al actualizar el documento en mongodb');
    }
  }


  async deleteById(object) {
    try {
      await this.#collection.deleteOne({ id: object.id });
    } catch (err) {
      logger.error(err);
      throw new Error('Error al eliminar un dato en mongodb');
    }
  }

  async deleteAll() {
    try {
      await this.#collection.deleteMany({});
      // borra toda la coleccion con un objeto literal vacio
    } catch (err) {
      logger.error(err);
      throw new Error('Error al intentear eliminar todos los datos, en mongodb');
    }
  }
}