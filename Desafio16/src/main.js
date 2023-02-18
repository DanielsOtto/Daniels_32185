import { crearServidor } from './servidor/index.js';
import { MODO, PORT } from './config/config.js';
import { logger } from './logger/pino.js';
import cluster from 'cluster';
import { cpus } from 'os';


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
        const servidor = crearServidor();
        await servidor.conectar({ puerto: PORT });
        logger.info(`proceso secundario: pid ${process.pid} conectado al puerto ${PORT} `);
    }
} else {
    const servidor = crearServidor();
    await servidor.conectar({ puerto: PORT });
    logger.info(`conectado al puerto ${PORT}!`);
}
