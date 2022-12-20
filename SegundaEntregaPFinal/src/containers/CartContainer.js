import * as fs from 'fs';

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

  // async createCart(id) {
  //   try {
  //     this.#cartObject.id = id;
  //     await fs.promises.writeFile(this.#file, JSON.stringify(this.#cartObject));
  //   } catch (err) {
  //     throw new Error({ errorMessage: err.message });
  //   }
  // }

  async save(object) { //--modif
    try {
      await fs.promises.writeFile(this.#file, JSON.stringify(object));
      return object;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async updateById(cart, objProd) {
    try {
      const obCart = await this.getAll();
      if (obCart.id === cart.id) {
        obCart.products.push(objProd);
        await fs.promises.writeFile(this.#file, JSON.stringify(obCart));
      }
    } catch (err) {
      throw new Error({ errorMessage: err.message });
    }
  }

  async getAll() {
    try {
      return JSON.parse(await fs.promises.readFile(this.#file, 'utf-8'));
    } catch (err) {
      throw new Error({ errorMessage: err.message });
    }
  }


  async getById(id) { // si el ID coincide devuelve el carrito -- correcto
    try {
      const object = await this.getAll();
      if (object.id === id) {
        return object;
      }
      return null;
    } catch (err) {
      throw new Error({ errorMessage: err.message });
    }
  }

  // async deleteAll(id) { // borra todos los elementos de un carrito -- modif
  //   try {
  //     const object = await this.getAll();

  //     if (object.id === id) {
  //       object.products = [];
  //       await fs.promises.writeFile(this.#file, JSON.stringify(object));
  //     }
  //   } catch (err) {
  //     throw new Error({ errorMessage: err.message });
  //   }
  // }

  async deleteById(idCart, idProd) { //metodo correcto -- MAL
    try {
      const object = await this.getAll();
      if (object.id === idCart) {
        const searchObject = object.products.find(ele => ele.id === idProd);
        const index = object.products.indexOf(searchObject);
        if (index >= 0) {
          object.products.splice(index, 1);
          await fs.promises.writeFile(this.#file, "[]");
          // await fs.promises.writeFile(this.#file, JSON.stringify(object));
          // WRITEFILE sobreescribe el archivo, yo crei que escribia encima del contenido
          // en cambio, agrega contenido. Por este motivo primero vacio el archivo, para despues
          // guardar el nuevo contenido
        }
      }
    } catch (err) {
      throw new Error({ errorMessage: err.message });
    }
  }
}
