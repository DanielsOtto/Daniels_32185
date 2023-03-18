import { fork } from 'child_process';
import path from 'path';

export function getInfoObj_Process() {
  const folderArray = process.cwd().split('\\');
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
  return object;
}

export function calculateNumbers(numbers) {
  const numbs = numbers || 100_000;
  const child = fork('./src/utils/randomNumbers.js');
  child.send({ event: 'limit', limit: numbs });
  return child;
}