import { logger } from '../config/pino.js'
import { randomUUID } from 'crypto';
import { productContainer } from '../containers/DataContainer.js';

// NO TIENEN Q TENER LOGICA



export async function getProducts(req, res) {
  try {
    const array = await productContainer.getAll();
    res.status(200).json(array);
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export async function getById({ params }, res) {
  try {
    const prod = await productContainer.getById(params.id);
    res.status(200).json(prod);
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export async function saveProduct({ body }, res) {
  try {
    const object = body;
    object.id = randomUUID();
    await productContainer.save(object);
    res.status(201).json(object);
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export async function updateById({ body, params }, res) {
  try {
    const object = body;
    await productContainer.updateById(params.id, object);
    res.status(200).json(prod);
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export async function deleteAll(req, res) {
  try {
    await productContainer.deleteAll();
    res.status(200).json({ mensaje: 'Productos eliminados' });
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export async function deleteById({ params }, res) {
  try {
    await productContainer.deleteById(params.id);
    res.status(200).json({ mensaje: 'objeto eliminado' });
  } catch (err) {
    logger.error(err);
    throw err;
  }
}



