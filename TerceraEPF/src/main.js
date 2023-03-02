import cluster from 'cluster';
import { cpus } from 'os';
import { MODO, PORT } from './config/config.js';
import createServer from './server/index.js';
import { logger } from './log/pino.js';

cluster.schedulingPolicy = cluster.SCHED_RR;

if (MODO === 'cluster') {
  const cantCpus = cpus().length
  if (cluster.isPrimary) {
    logger.info('modo de ejecucion: CLUSTER');
    logger.info(`proceso primario: pid ${process.pid}`);

    for (let i = 0; i < cantCpus; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      logger.info(`adios mundo cruel (pid: ${worker.process.pid})`)
      cluster.fork();
    });
  } else {
    const server = createServer();
    await server.connect({ puerto: PORT });
    logger.info(`proceso secundario: pid ${process.pid} conectado al puerto ${PORT} `);
  }
} else {
  const server = createServer();
  await server.connect({ puerto: PORT });
  logger.info(`conectado al puerto ${PORT}!`);
}

//otro mail ?
//asunto nuevo registro
// un mail al admin con los datos del usuario
// admin mail ? alguna guardada en config.js

//opcion comprar 4hs min 12
// 1- lista productos en carrito
// 2- crea un registro del carrito
// 3- elimina productos del carrito ( nos quedamos con el registro)
// 4- se envian dos mensajes

// dos mails,
// uno de compras, con la cantidad de prods + id de prods + precio de prods
// fulanito hizo tal pedido + lista prods

//segundo mail,
// cuando el usuario hace una compra le llega un mail
// "pedido de compra recibido"
