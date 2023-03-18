// Clase 15
// Crea una instancia del servidor

import { Servidor } from "./Servidor.js";

export default function createServer() {
  return new Servidor();
  // hay q pasarle en el constructor
  // la ruta de la api y el router a utilizar, cuando se invoca
}