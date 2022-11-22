import * as fs from 'fs';
const ruta = './cart.txt';

class ContainerCart {
  #objectCart;
  #file;
  constructor(file) {
    this.#file = file;
    this.#objectCart = {
      id: '',
      products: []
    };
  }

  async createCart(id) {
    try {
      this.#objectCart.id = id;
      await fs.promises.writeFile(this.#file, JSON.stringify(this.#objectCart));
    } catch (error) {
      throw new Error('Error en el método createCart');
    }
  }

  async save(id, object) {
    try {
      this.#objectCart = await this.getAll();
      if (this.#objectCart.id === id) {
        this.#objectCart.products.push(object);
        await fs.promises.writeFile(this.#file, JSON.stringify(this.#objectCart));
      }
    } catch (error) {
      throw new Error('Error en el método save');
    }
  }

  async getAll() {
    try {
      return JSON.parse(await fs.promises.readFile(this.#file, 'utf-8'));
    } catch (error) {
      throw new Error('Error en el método getAll');
    }
  }

  async deleteProducts(id) {
    try {
      this.#objectCart = await this.getAll();
      if (this.#objectCart.id === id) {
        this.#objectCart.products = [];
        await fs.promises.writeFile(this.#file, JSON.stringify(this.#objectCart));
      }
    } catch (error) {
      throw new Error('Error en el método deleteProducts');
    }
  }

  async getAllProducts(id) {
    try {
      this.#objectCart = await this.getAll();
      if (this.#objectCart.id === id) {
        return this.#objectCart.products;
      }
      return null;
    } catch (error) {
      throw new Error('Error en el método getAllProducts');
    }
  }

  async deleteOneProdById(idCart, idProd) {
    try {
      this.#objectCart = await this.getAll();
      if (this.#objectCart.id === idCart) {
        const searchObject = this.#objectCart.products.find(element => element.id === idProd);
        let index = this.#objectCart.products.indexOf(searchObject);
        if (index >= 0) {
          this.#objectCart.products.splice(index, 1);
        }
        await fs.promises.writeFile(this.#file, JSON.stringify(this.#objectCart));
      }
    } catch (error) {
      throw new Error('Error en el método deleteOneProdById');
    }
  }
}

fs.promises.writeFile(ruta, '[]');
const cart = new ContainerCart(ruta);
export default cart;