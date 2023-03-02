import { saveProds, updateProdsById, deleteOne } from "../models/productsModel.js";
import { chosenProdsContainer } from "../dao/DataContainer.js";
import { logger } from "../log/pino.js";


//EL CONTROLADOR DELEGA LAS TAREAS AL MODELO
// NEXO entre la VISTA y el MODELO
// trabajo aca y llamo al modelo


async function getAllProducts(req, res) {
  try {
    res.status(200).json(await chosenProdsContainer.getAll());
  } catch (err) {
    logger.error(err.message);
    throw err;
  }
}

async function getByIdProducts({ params }, res) {
  try {
    let product = await chosenProdsContainer.getById(params.id);
    //el producto todavia no es un objeto, hay q transformarlo.
    // fijarse con el video de la clase
    if (!product) {
      res.status(404).json({ error: 'product not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    logger.error(err.message);
    throw err;
  }
}

async function saveProduct({ body }, res) {
  try {
    const object = body;
    const result = await saveProds(object); // result muestra objeto vacio -- faltaba await
    res.status(201).json(result);
  } catch (err) {
    logger.error(err.message);
    throw err;
  }
}

async function updateById({ body, params }, res) {
  try {
    const object = body;
    await updateProdsById(params.id, object)
    res.status(200).json(object);
  } catch (err) {
    logger.error(err.message);
    throw new Error('Error al actualizar por id');
  }
}

async function deleteById({ params }, res) {
  try {
    await deleteOne(params.id);
    res.status(200).json({ message: "Deleted object" });
  } catch (err) {
    logger.error(err.message);
    throw new Error('Error. Cant delete product by ID');
  }
}

async function deleteAll(req, res) {
  try {
    await chosenProdsContainer.deleteAll();
    res.status(200).json({ message: "Delete all products" });
  } catch (err) {
    logger.error(err.message);
    throw err;
  }
}

export { getAllProducts, getByIdProducts, saveProduct, updateById, deleteById, deleteAll };