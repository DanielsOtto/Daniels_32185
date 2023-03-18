// El contenido de este archivo se vio en la clase 15
// Este main utiliza los datos de la carpeta Servidor (tmb creada en la clase 15)
// La explicacion del cluster, esta en la carpeta cluster

// import { createServer as createIOServer } from 'http'; // para sockets
// import { Server } from "socket.io";  // para sockets

import { cpus } from 'os';
import cluster from 'cluster';
import createServer from './server/index.js';
import { MODO, PORT } from './config/config.js';
import { logger } from './config/pino.js';



cluster.schedulingPolicy = cluster.SCHED_RR;



if (MODO === 'cluster') {
  if (cluster.isPrimary) {
    cluster.schedulingPolicy = cluster.SCHED_RR;

    const cantCpus = cpus().length;
    logger.info('modo de ejecucion: CLUSTER');
    logger.info(`proceso primario: pid ${process.pid}`);

    for (let i = 0; i < cantCpus; i++) {
      cluster.fork();
    }

    cluster.on('exit', worker => {
      logger.info(`Desconectandome - pid ${worker.process.pid}`);
      cluster.fork();
    })
  } else {
    logger.info(`proceso secundario - pid ${process.pid}`);
    const server = new createServer();
    await server.connect({ puerto: PORT });
    logger.info(`conectado al puerto ${PORT}!`);
  }
} else {
  const server = new createServer();
  await server.connect({ puerto: PORT });
  logger.info(`conectado al puerto ${PORT}!`);
}

