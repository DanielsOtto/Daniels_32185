// El contenido de este archivo se vio en la clase 15
// Este main utiliza los datos de la carpeta Servidor (tmb creada en la clase 15)
// La explicacion del cluster, esta en la carpeta cluster

import cluster from 'cluster';
import { cpus } from 'os';
import { MODO, PORT } from './config/config.js';
import crearServidor from './Servidor/index.js';

cluster.schedulingPolicy = cluster.SCHED_RR;

if (MODO === 'cluster') {
  if (cluster.isPrimary) {
    cluster.schedulingPolicy = cluster.SCHED_RR;

    const cantCpus = cpus().length;
    console.log('modo de ejecucion: CLUSTER');
    console.log(`proceso primario: pid ${process.pid}`);

    for (let i = 0; i < cantCpus; i++) {
      cluster.fork();
    }

    cluster.on('exit', worker => {
      console.log(`Desconectandome - pid ${worker.process.pid}`);
      cluster.fork();
    })
  } else {
    console.log(`proceso secundario - pid ${process.pid}`);
    const server = new crearServidor();
    await server.connect({ puerto: PORT });
    console.log(`conectado al puerto ${PORT}!`);
  }
} else {
  const server = new crearServidor();
  await server.connect({ puerto: PORT });
  console.log(`conectado al puerto ${PORT}!`);
}

