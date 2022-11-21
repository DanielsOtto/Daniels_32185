import products from "../containers/ContainerProds.js";
import { randomUUID } from 'crypto';

async function get(req, res) {
  try {
    res.json(await products.getAll());
  } catch (error) {
    throw new Error('Se ha producido un error en el controlador Get');
  }
}

async function getById({ params }, res) {
  try {
    let product = await products.getById(params.id);
    if (!product) {
      res.status(404);
      res.json({ error: 'product not fount' });
    } else {
      res.status(201);
      res.json(product);
    }
  } catch (error) {
    throw new Error('Se ha producido un error en el controlador GetById');
  }
}

async function post({ body }, res) {
  try {
    const object = body;
    object.id = randomUUID();
    await products.save(object);
    res.status(201);
    res.json(object);
  } catch (error) {
    throw new Error('Se ha producido un error en el controlador Post');
  }
}

async function updateById({ body, params }, res) {
  try {
    const object = body;
    await products.updateById(params.id, object);
    res.json(object);
  } catch (error) {
    throw new Error('Se ha producido un error en el controlador Put');
  }
}

async function deleteById({ params }, res) {
  try {
    await products.deleteById(params.id);
    res.json({ message: 'deleted object' });
  } catch (error) {
    throw new Error('Se ha producido un error en el controlador DeleteById');
  }
}

export { get, getById, post, updateById, deleteById };