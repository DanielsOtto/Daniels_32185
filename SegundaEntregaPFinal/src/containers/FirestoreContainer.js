import { firestoreDatabase } from '../config/firestoreClient.js';

function asObject(doc) {
  return { id: doc.id, ...doc.data() };
}

export class FirestoreContainer {
  #collection;
  constructor(collectionName) {
    this.#collection = firestoreDatabase.collection(collectionName);
  }

  async save(object) {
    try {
      delete object.id;
      const ref = await this.#collection.add(object);
      return { ...object, id: ref.id };
    } catch (err) {
      console.log(err);
      throw new Error('Error al guardar en firestore');
    }
  }

  async getAll() {
    const result = [];
    try {
      const snapshot = await this.#collection.get();
      snapshot.forEach(doc => {
        result.push(asObject(doc)); //transformo a objeto y guardo en el array
      });
    } catch (err) {
      console.log(err);
      throw new Error('Error al obtener elementos en firestore');
    }
    return result; // retorno el arreglo de elementos
  }

  async getById(id) {
    let searchObject;
    try {
      let snapshot = await this.#collection.doc(id).get();
      // if (!snapshot.exists) throw new Error('El elemento buscado no existe'); 
      searchObject = asObject(snapshot);
    } catch (err) {
      console.log(err);
      throw new Error('Error al obtener un dato en firestore');
    }
    return searchObject;
  }

  async updateById(oldObject, obj) {
    let ref = {};
    try {
      ref = await this.#collection.doc(oldObject.id).update(obj); // sin terminar
    } catch (err) {
      console.log(err);
      throw new Error('Error al actualizar un dato en firestore');
    }
  }

  async deleteById(object) {
    try {
      await this.#collection.doc(object.id).delete();
    } catch (err) {
      console.log(err);
      throw new Error('Error al eliminar un dato en firestore');
    }
  }

  async deleteAll() {
    try {
      await this.#collection.delete();
    } catch (err) {
      console.log(err);
      throw new Error('Error al intentear eliminar todos los datos, en firestore');
    }
  }
}