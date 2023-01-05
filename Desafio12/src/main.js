import { httpServer } from './server.js';
import { PORT } from './config/config.js';


// me conecto a httpServer porque estoy utilizando SOCKETS
// sino, me conectaria con app
httpServer.listen(PORT, () => {  //no son necesarios req, res
  try {
    console.log(`Servidor conectado en puerto ${PORT}`);
  } catch (error) {
    console.log(error)
    throw new Error('Error al crearse el servidor');
  }
});