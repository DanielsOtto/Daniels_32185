const fs = require('fs');

class Container {
  #array;
  // #file;
  constructor() {
    this.#array = [];
    // this.#file;
  }

  async save(title, price, url) {
    try {
      const obj = {
        id: 1,
        title: title,
        price: price,
        thumbnail: url
      }
      this.#array.push(obj)
      await fs.promises.writeFile('./productos.txt', JSON.stringify(this.#array, null, '\t'))
    }
    catch (err) {
      console.log(err)
    }
  }
  async getById(id) {
    try {
      const resultado = await fs.promises.readFile('./productos.txt', 'utf-8')
      // console.log(resultado)
      const conversion = JSON.parse(resultado)
      console.log(conversion)
      conversion.forEach(element => {
        if (id == element.id) {
          console.log("El id elegido corresponde a ", element)
        }
      })
    }
    catch (err) {
      console.error(err)
    }
  }
}

const element = new Container();

element.save("botas", 100, "www.s")
  .then(() => {
    // console.log(id1)
    element.getById(1)
  });