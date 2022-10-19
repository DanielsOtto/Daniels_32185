const fs = require('fs').promises;

class Container {
  #array;
  #file;
  constructor(road) {
    this.#array = [];
    this.#file = road;
  }

  async save(id, title, price, url) {
    const obj = {
      id: id,
      title: title,
      price: price,
      thumbnail: url
    };
    try {
      this.#array.push(obj);
      await fs.writeFile(this.#file, JSON.stringify(this.#array, null, '\t'));
    } catch (error) {
      throw new Error(`Error en el método save.`);
    }
  }

  async getById(id) {
    try {
      const array = JSON.parse( await fs.readFile(this.#file, 'utf-8'));
      const obj = array.find(element => element.id === id);
      if (!obj) {
        return null;
      }
        return obj;
    } catch (error) {
      throw new Error(`elemento con id ${id} no encontrado`);
    }
  } 

  async getAll() {
    try {
      return JSON.parse(await fs.readFile(this.#file, 'utf-8'));
    } catch (error) {
      throw new Error(`Error en el método getAll`);
    }
  } 

  async deleteById(id) {
    try {
      const array = JSON.parse(await fs.readFile(this.#file, 'utf-8'));
      await fs.writeFile(this.#file, JSON.stringify(array.filter(element => element.id !== id)));
    } catch (error) {
      throw new Error(`Error en el método deleteById`);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.#file, '[]');
    } catch (error) {
      throw new Error(`Error en el método deleteAll`);
    }
  }
}

async function test() {
  await fs.writeFile('./productos.txt', '[]');
  const element = new Container('./productos.txt'); // Creando archivos
  try {
    await element.save(1,'caja verde', 200, 'www.v');
    await element.save(2,'caja roja', 300, 'www.r');
    await element.save(3,'caja negra', 1200, 'www.n');
    await element.save(4,'caja azul', 100, 'www.a');

    // mostrando todos los elementos
    console.log(await element.getAll());

    // mostrando un elemento por ID
    const elem = await element.getById(2);
    console.log(elem);

    // borrando un elemento por ID
    await element.deleteById(3);
    console.log(await element.getAll());

    // eliminando todos los elementos
    await element.deleteAll();
    console.log(await element.getAll());

  } catch (error) {
    throw new Error(`Error al llamar a los métodos en la función test`);
  }
}

test();
