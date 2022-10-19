const fs = require('fs').promises;

class Container {
  #array;
  #file;
  constructor(road) {
    this.#array = [];
    this.#file = road;
  }

  async save(title, price, url) {
    const obj = {
      title: title,
      price: price,
      thumbnail: url
    };

    try {
      if (this.#array.length === 0) {
        obj.id = 1;
        this.#array.push(obj);
      } else {
        obj.id = this.#array[this.#array.length - 1].id + 1;
        this.#array.push(obj);
      }
      await fs.writeFile(this.#file, JSON.stringify(this.#array, null, '\t'));
    } catch (error) {
      throw new Error(`Error en el método save.`);
    }
    return obj.id;
  }// revisado

  async getById(id) {
    try {
      const array = JSON.parse( await fs.readFile(this.#file, 'utf-8'));
      const obj = array.find(element => element.id === id);
      if (!obj) {
        return null;
      } else {
        return obj;
      }
    } catch (error) {
      throw new Error(`elemento con id ${id} no encontrado`);
    }
  } //revisado

  async getAll() {
    try {
      return JSON.parse(await fs.readFile(this.#file, 'utf-8'));
    } catch (error) {
      throw new Error(`Error en el método getAll`);
    }
  } // revisado

  async deleteById(id) {
    try {
      const array = JSON.parse(await fs.readFile(this.#file, 'utf-8'));
      await fs.writeFile(this.#file, JSON.stringify(array.filter(element => element.id !== id)));
    } catch (error) {
      throw new Error(`Error en el método deleteById`);
    }
  }// revisado

  async deleteAll() {
    try {
      await fs.writeFile(this.#file, "[]");
    } catch (error) {
      throw new Error(`Error en el método deleteAll`);
    }
  }// revisado
}

async function test() {

  const element = new Container('./productos.txt'); // Creando archivos
  try {
    const idGreen = await element.save('caja verde', 200, 'www.v');
    await element.save('caja roja', 300, 'www.r');
    await element.save('caja negra', 1200, 'www.n');
    const idBlue = await element.save('caja azul', 100, 'www.a');

    // mostrando todos los elementos
    console.log(await element.getAll());

    // mostrando un elemento por ID
    const elem = await element.getById(idBlue);
    console.log(elem)

    // borrando un elemento por ID
    await element.deleteById(idGreen);
    console.log(await element.getAll());

    // eliminando todos los elementos
    await element.deleteAll();
    console.log(await element.getAll());

  } catch (error) {
    console.log(error)
  }
}

test()
