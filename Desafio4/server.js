const express = require('express');
const app = express();
const element = require('./Container');
const { randomUUID } = require('crypto');
const port = 8080;



async function controllerGet(req, res) {
  try {
    res.json(await element.getAll());
  } catch (error) {
    throw new Error('Se ha producido un error en controllerGet');
  }
}

async function controllerGetById({ params }, res) {
  try {
    const obj = await element.getById(params.id);
    if (!obj) {
      res.status(404);
      res.json({ error: 'producto no encontrado' });
    } else {
      res.json(obj);
    }
  } catch (error) {
    throw new Error('Se ha producido un error en controllerGetById');
  }
}

async function controllerPost({ body }, res) {
  try {
    const object = body;
    object.id = randomUUID();
    await element.save(object);
    res.status(201);
    res.json(object);
  } catch (error) {
    throw new Error('Se ha producido un error en controllerPost');
  }
}

async function controllerPutById({ body, params }, res) {

  try {
    const array = await element.getAll();
    const pos = array.findIndex(obj => obj.id === params.id);
    if (pos >= 0) {
      const obj = { ...array[pos], ...body };
      await element.updateById(pos, obj);
      res.json(obj);
    } else {
      res.status(404);
      res.json({ 'mensaje': 'objeto no encontrado' });
    }
  } catch (error) {
    throw new Error('Ha ocurrido un error en controllerPutById');
  }
}

async function controllerDeleteById({ params }, res) {
  try {
    await element.deleteById(params.id);
    res.json({ message: 'eliminado correctamente' })
  } catch (error) {
    throw new Error('Ha ocurrido un error en el controladorDeleteById');
  }
}


// MIDDLEWARE - SOFTWARE que se coloca entre dos procesos -- SIRVEN para interpretar todas las peticiones que llegan al servidor.
app.use(express.json()); // agrega un proceso adicional a express, que cada vez que llega una petición
//va a revisar lo que hay despues del renglón en blanco, y si hay un json lo va a parsear
// y lo va a guardar en el "body" (contiene el cuerpo de la petición)
// hay que aclarar que es context-type JSON (en el header), los datos se cargan en la opcion JSON del body.

//------ se pueden usar los dos juntos ------ para interpretar tanto un JSON como un FORMULARIO

//para interpretar campos de un formulario
app.use(express.urlencoded({ extended: true })) // con este middleware podemos enviar un formulario.
//en el thunder los datos se cargan en la opcion  FORM ENCODED  del body



const routerApi = express.Router();
routerApi.get('/', controllerGet); // COMPROBADO  ANDA  CORRECTAMENTE
routerApi.get('/:id', controllerGetById); // COMPROBADO  ANDA  CORRECTAMENTE
routerApi.post('/', controllerPost);  // COMPROBADO  ANDA  CORRECTAMENTE
routerApi.put('/:id', controllerPutById); // COMPROBADO, ANDA CORRECTAMENTE
routerApi.delete('/:id', controllerDeleteById); // COMPROBADO, ANDA CORRECTAMENTE


app.use('/api/products', routerApi);


app.listen(port, (req, res) => {
  try {
    console.log(`Conectado al puerto ${port}`);
  } catch (error) {
    throw new Error(error);
  }
})



// problema 2 = como meto la carpeta node_modules en gitignore ? mas archivos gitignore

// falta

//incorporar el ROUTER de express con la url base '/api/productos' y configurar subrutas
//faltan los middlewares
//falta el app.setting ? con el port