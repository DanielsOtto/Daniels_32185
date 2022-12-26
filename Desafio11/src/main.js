import { app } from './server.js';
import { port } from './config.js';


app.listen(port, () => { //no son necesarios req, res
  try {
    console.log(`Server on in port ${port}!`);
  } catch (error) {
    throw new Error('Error al levantar el server');
  }
});