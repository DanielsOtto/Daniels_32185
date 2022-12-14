import { ModelContainer } from '../models/ModelContainer.js';
import { randomUUID } from crypto;

async function get(req, res) {
  try {
    res.json(await ModelContainer.getAllProds());
  } catch (error) {
    throw error;
  }
}

async function getById({ params }, res) {
  try {
    let product = await ModelContainer.getByIdProd(params.id);
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

async function post({ body }, res) {
  try {
    const object = body;
    object.id = randomUUID(); // hay q guardarlo en los contenedores como _id
    await ModelContainer.saveProds(object);
    res.status(201);
    res.json(object);
  } catch (err) {
    throw err;
  }
}

async function updateById({ body, params }, res) {
  try {
    const object = body;
    await ModelContainer.updateByIdProd(params.id, object);
    res.status(201);
    res.json(object);
  } catch (err) {
    throw err;
  }
}

async function deleteById({ params }, res) {
  try {
    await ModelContainer.deleteByIdProds(params.id);
  } catch (err) {
    throw err;
  }
}

async function deleteAll(req, res) {
  try {
    await ModelContainer.deleteAllProds();
  } catch (err) {
    throw err;
  }
}

export { get, getById, post, updateById, deleteById, deleteAll };