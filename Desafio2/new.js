const fs = require('fs');

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
      await fs.promises.writeFile(this.#file, JSON.stringify(this.#array, null, '\t'));
    } catch (error) {
      console.log(error);
    }
    return obj.id;  
  } // hasta aca anda bien

  async getById(id) {

    try {
      const result = await fs.promises.readFile(this.#file, 'utf-8');
      const array = JSON.parse(result);
      if (array.length > 0) {
        if(!array.find(element => element.id === id)){
          console.log('No hay objetos con ese ID');
        }else{
          const obj = array.find(element => element.id === id);
          console.log('El objeto encontrado es: ')
          console.log(obj);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getAll() {
    try {
      const result = await fs.promises.readFile(this.#file, 'utf-8');
      const array = JSON.parse(result);
      console.log('El contenido del archivo es:')
      console.log(array);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id){
    try {
      const result = await fs.promises.readFile(this.#file, 'utf-8');
      const array = JSON.parse(result);
      if(array.find(element => element.id === id)){
        const arr = array.filter(element => element.id !== id);
        console.log('NUEVO ARREGLO: ')
        console.log(arr)
        await fs.promises.writeFile(this.#file, JSON.stringify(arr));
      } else{
        console.log('NO se encuentra ningun objeto con ese ID.');
      }     
    } catch (error) {
      console.error(error); 
    }
  }

  async deleteAll(){
    try {
      console.log("BORRANDO todo el contenido del archivo");
      await fs.promises.writeFile(this.#file, []);
    } catch (error) {
      console.log(error);
    }
  }

}

const element = new Container('./productos.txt');
// // carga de elementos en el archivo

element.save('caja azul', 100, 'www.a')
  .then((id) => {
    element.save('caja verde', 200, 'www.v')
    console.log(id)  // bien
    element.getById(1)
    element.getAll();
    element.deleteById(1);
    element.getAll();
  })
  .then(()=>{
    element.deleteAll();
    element.getAll();
  })
  .catch( err => {
    console.error(err);
  });
// element.save('caja verde', 200, 'www.v')
//   .then((id) => {
//     console.log(id)
//   })
// element.save('caja roja', 300, 'www.r')
  // .then((id) => {
  //   console.log(id)
  // })

