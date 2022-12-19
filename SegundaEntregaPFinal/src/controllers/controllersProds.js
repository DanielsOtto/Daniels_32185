import * as fs from 'fs';
import { chosenProdsContainer } from "../containers/DataContainer.js";
import { saveProds, updateProdsById, deleteOne } from "../models/productsModel.js";
import { RUTA } from '../config/config.js';


//EL CONTROLADOR DELEGA LAS TAREAS AL MODELO
// NEXO entre la VISTA y el MODELO
// trabajo aca y llamo al modelo

async function createFileS(req, res, next) {
  try {
    if (!fs.existsSync(RUTA)) {
      await fs.promises.writeFile(RUTA, '[]');
    }
    next();
  } catch (error) {
    console.log(error)
    throw new Error('Error al crear el archivo');
  }
}

async function getAllProducts(req, res) {
  try {
    res.status(200);
    res.json(await chosenProdsContainer.getAll());
  } catch (error) {
    throw error;
  }
}

async function getByIdProducts({ params }, res) {
  try {
    let product = await chosenProdsContainer.getById(params.id);
    //el producto todavia no es un objeto, hay q transformarlo.
    // fijarse con el video de la clase
    if (!product) {
      res.status(404);
      res.json({ error: 'product not found' });
    } else {
      res.status(201);
      res.json(product);
    }
  } catch (error) {
    throw error;
  }
}

async function saveProduct({ body }, res) {
  try {
    const object = body;
    const result = await saveProds(object); // result muestra objeto vacio -- faltaba await
    res.status(201);
    res.json(result);
  } catch (err) {
    throw err;
  }
}

async function updateById({ body, params }, res) {
  try {
    const object = body;
    await updateProdsById(params.id, object)
    // await chosenProdsContainer.updateByIdProd(params.id, object);
    res.status(201);
    res.json(object);
  } catch (err) {
    console.log(err);
    throw new Error('Error al actualizar por id');
  }
}

async function deleteById({ params }, res) {
  try {
    await deleteOne(params.id);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    throw new Error('Error al borrar por id');
  }
}

async function deleteAll(req, res) {
  try {
    await chosenProdsContainer.deleteAll();
    res.sendStatus(200);
  } catch (err) {
    throw err;
  }
}

export { getAllProducts, getByIdProducts, saveProduct, updateById, deleteById, deleteAll, createFileS };