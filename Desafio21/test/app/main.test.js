// Testeo sin CLUSTER
import axios from 'axios';
import { PORT } from '../../src/config/config.js';
import createServer from '../../src/server/index.js';

const server = new createServer();
let ID = 0;
axios.defaults.baseURL = `http://localhost:${PORT}/api/products`;


describe('Iniciando servidor', function () {
  // antes de TODAS las pruebas!
  before(async () => {
    await server.connect({ puerto: PORT });
  });

  // despues de TODAS las pruebas!
  after(async () => {
    console.log('TEST FINALIZADO');
    await server.disconnect();
  });

  describe('servidor', function () {

    it('Cargando producto', async () => {
      const name = 'heladera';
      const price = 500;
      const description = 'caja grande y blanca';
      const thumbnail = 'la imagen';

      const { data, status } = await axios.post('/', {
        name, price, description, thumbnail
      });

      ID = data.id;

      if (!data) throw new Error('No se cargo el producto');
      if (status !== 201) throw new Error('El estado no es 201');
      if (!data.name) throw new Error('El prod no tiene nombre');
      if (typeof data.name !== 'string') throw new Error('El nombre del prod no es string');
      if (data.name !== name) throw new Error('El nombre creado no es el mismo que el nombre enviado ');
      if (!data.id) throw new Error('El producto cargado no tiene ID');
      if (typeof data.id !== 'string') throw new Error('El id del producto no es string');
      if (typeof data.description !== 'string') throw new Error('La descripcion del producto no es string');
      if (typeof data.thumbnail !== 'string') throw new Error('El thumbnail del producto no es string');
    });

    it('Visualizar UN producto mediante ID', async () => {
      const { data, status } = await axios.get(`/${ID}`);

      if (!data) throw new Error('NO se encontro el elemento.');
      if (!status) throw new Error('NO hay estado.')
      if (status !== 200) throw new Error('El estado NO es 200.');
    });

    it('Visualizar TODOS los productos', async () => {
      const { data, status } = await axios.get('/');

      if (!data) throw new Error('NO se encontraron los productos.');
      if (!status) throw new Error('NO hay estado.');
      if (status !== 200) throw new Error(`El estado no es 200, es ${status}.`);
    });

    it('Actualizar UN producto mediante ID', async () => {
      //recibe por params el ID del prod y por body los datos a cambiar del prod
      const { data, status } = await axios.put(`/${ID}`, {
        price: 7500,
        description: 'potencial electrico A',
      });

      if (!data) throw new Error('NO se actualizo el producto.');
      if (!status) throw new Error('NO hay estado.');
      if (status !== 200) throw new Error(`El estado no es 200, es ${status}.`);
    });

    it('Elimina UN producto mediante ID', async () => {
      const { data, status } = await axios.delete(`/${ID}`);

      if (!data) throw new Error('NO se elimino el producto.');
      if (!status) throw new Error('NO hay estado.');
      if (status !== 200) throw new Error(`El estado no es 200, es ${status}.`);
    });

    // it('Elimina TODOS los productos', async () => {
    //   const { data, status } = await axios.delete('/');

    //   if (!data) throw new Error('NO se eliminaron los objetos.');
    //   if (!status) throw new Error('NO hay estado.');
    //   if (status !== 200) throw new Error(`El estado no es 200, es ${status}.`);
    // });

  });
});