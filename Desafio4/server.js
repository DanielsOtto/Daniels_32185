const express = require('express');
const app = express();
const { routerApi } = require("./routers/routerApi.js");


// MIDDLEWARE - SOFTWARE que se coloca entre dos procesos -- SIRVEN para interpretar todas las peticiones que llegan al servidor.
app.use(express.json()); // agrega un proceso adicional a express, que cada vez que llega una petición
//va a revisar lo que hay despues del renglón en blanco, y si hay un json lo va a parsear
// y lo va a guardar en el "body" (contiene el cuerpo de la petición)
// hay que aclarar que es context-type JSON (en el header), los datos se cargan en la opcion JSON del body.

//------ se pueden usar los dos juntos ------ para interpretar tanto un JSON como un FORMULARIO
//para interpretar campos de un formulario
app.use(express.urlencoded({ extended: true })); // con este middleware podemos enviar un formulario.
//en el thunder los datos se cargan en la opcion  FORM ENCODED  del body

app.use(express.static('public'));

//rutas
app.use('/api/products', routerApi);

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), (req, res) => {
  try {
    console.log(`Conectado al puerto ${app.get('port')}`);
  } catch (error) {
    throw new Error(error);
  }
});