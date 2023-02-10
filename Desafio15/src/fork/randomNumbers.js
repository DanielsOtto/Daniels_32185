//archivo que genera un arreglo de numeros aleatorios del 1 al 1.000
// la cantidad de elementos se pasa por params, si no es de 100.000
// se utiliza FORK para que sea un server NO BLOQUEANTE
const randomNumbers = () => {
  const array = [];
  process.on('message', msg => {
    // if (!msg.limit) { // no va a ocurrir nunca
    //   msg.limit = 100000;
    // }
    for (let i = 0; i < msg.limit; i++) {
      const object = {
        value: 0,
        cant: 0
      };
      let random = Math.round(Math.random() * i);
      if (array.length === 0) {
        object.value = random;
        object.cant = 1;
        array.push(object);
      } else {
        if (array.find(el => el.value === random)) {
          const index = array.findIndex(el => el.value === random);
          const oneMore = array[index].cant + 1;
          array[index].cant = oneMore;
        } else {
          object.value = random;
          object.cant = 1;
          array.push(object);
        }
      }
    }
    process.send({ event: 'response', respuesta: array });
  });
}

randomNumbers(); // hay q llamar a la funcion, si no no se activa