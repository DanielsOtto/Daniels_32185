import { fork } from 'child_process';
import path from 'path';

export function infoObjProcess(req, res) {
  const folderArray = process.cwd().split('\\')
  const inputArguments = process.argv.splice(2);
  const object = {
    inputArguments: inputArguments,
    NodeVersion: process.version,
    SistemaOperativo: process.platform,
    RSS: process.memoryUsage().rss,
    EjecutionPath: process.cwd(),
    processID: process.pid,
    projectFolder: folderArray[folderArray.length - 1],
  }
  res.json(object)
}


export function calculateNumbers({ params }, res) {

  const numbs = params.number || 100_000;
  const child = fork('./src/fork/randomNumbers.js');
  child.send({ event: 'limit', limit: numbs });

  child.on('message', msg => {
    if (msg.event === 'response') {
      res.json(msg.respuesta);
    } else {
      res.sendStatus(400);
    }
  });
}