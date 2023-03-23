import { randomUUID } from 'crypto';
import { logger } from '../config/pino.js';
import { productsService } from '../services/products.service/index.js';
import { ValidatorProduct } from '../validators/products.validators/ValidatorProduct.js';
//controllers llama a servicios
// NO TIENEN Q TENER LOGICA


// NECESITO UN MANEJADOR DE ERRORES!! 


// Desafio 20 ACTUALIZADO CORRECTAMENTE
export async function saveProd({ body }, res) {
  const object = new ValidatorProduct(body);
  object.id = randomUUID(); // NO SE HACE ACA !!
  try {
    const product = await productsService.save(object);
    res.status(201).json(product); //product es object + id 
  } catch (e) {
    logger.error(e);
    throw e;
  }
} // Nuevo

export async function getAll(req, res) {
  try {
    const products = await productsService.getAll();
    res.status(200).json(products);
  } catch (e) {
    logger.error(e);
    throw e;
  }
} // Nuevo

export async function getOne({ params }, res) { // cambiar nombre
  const { id } = params;
  try {
    const product = await productsService.getById(id);
    res.status(200).json(product.datos());
  } catch (e) {
    logger.error(e);
    throw e;
  }
}// Nuevo

export async function updateOne({ body, params }, res) {
  // cambiar nombre
  const { id } = params;
  const object = body;
  try {
    await productsService.updateById(id, object);
    res.sendStatus(200);
  } catch (e) {
    logger.error(e);
    throw e;
  }
} // nuevo

export async function deleteOne({ params }, res) { //cambiar nombre
  const { id } = params;
  try {
    await productsService.deleteById(id);
    res.sendStatus(200);
  } catch (e) {
    logger.error(e);
    throw e;
  }
}// nuevo

export async function deleteMany(req, res) { // cambiar nombre
  try {
    await productsService.deleteAll();
    res.sendStatus(200);
  } catch (e) {
    logger.error(e);
    throw e;
  }
}// nuevo