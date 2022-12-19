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

  async save(object) {
    let array = [];
    try {
      array = await this.getAll()
      if (object) {
        array.push(object)
      }
      await fs.promises.writeFile(this.#file, JSON.stringify(array));
      return object;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async updateById(cart, object) {
    try {
      // console.log(cart)
      const array = await this.getAll();
      for (let obj of array) {
        // console.log(array)

        if (obj.id === cart.id) {
          obj.products.push(object);
          await fs.promises.writeFile(this.#file, JSON.stringify(obj));
        }
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

  async deleteAll(id) { // borra todos los elementos de un carrito
    try {
      const array = await this.getAll();
      for (const object of array) {
        if (object.id === id) {
          object.products = [];
          await fs.promises.writeFile(this.#file, JSON.stringify(object));
        }
      }
    } catch (err) {
      throw new Error({ errorMessage: err.message });
    }
  }

  async getById(id) { // obtiene los productos de un carrito -- aca me esta dando null
    try {
      const array = await this.getAll();
      const searchObject = array.find(obj => obj.id === id);
      if (searchObject) {
        return searchObject;
      }
      return null;
    } catch (err) {
      throw new Error({ errorMessage: err.message });
    }
  }

  async deleteById(idCart, idProd) { //metodo correcto
    try {
      const array = await this.getAll();
      for (const object of array) {
        if (object.id === idCart) {
          const searchObject = this.#cartObject.find(ele => ele.id === idProd);
          const index = this.#cartObject.products.indexOf(searchObject);
          if (index >= 0) {
            this.#cartObject.products.splice(index, 1);
          }
          await fs.promises.writeFile(this.#file, JSON.stringify(this.#cartObject));
        }
      }
    } catch (err) {
      throw new Error({ errorMessage: err.message });
    }
  }
}
