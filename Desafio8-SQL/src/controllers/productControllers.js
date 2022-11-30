import { ProductsContainer } from "../containers/productsContainer.js";
import { randomUUID } from 'crypto';
import { createTable } from '../tables/productsTable.js';
const tableName = 'products';


export async function createProductsTable(req, res, next) {  // middleware para todas las rutas
  try {
    await createTable(tableName);
    next();
  } catch (error) {
    throw error;
  }
}

export async function get(req, res) {
  try {
    res.json(await ProductsContainer.getAll());
  } catch (err) {
    // throw new Error('Error en el metodo getAll');
    throw new Error(err);
  }
}

export async function post({ body }, res) {
  try {
    const object = body;
    object.id = randomUUID();
    await ProductsContainer.save(object);
    res.status(201);
    res.json(object);
  } catch (error) {
    // throw new Error('Error en el metodo save');
    throw new Error(error);
  }
}

export async function getById({ params }, res) {
  try {
    const wanted = await ProductsContainer.getById(params.id_prod);
    if (!wanted) {
      res.status(404);
      res.json({ message: 'not found' });
    } else {
      res.status(201);
      res.json(wanted);
    }
  } catch (err) {
    throw new Error(err);
  }
}

export async function updateById({ body, params }, res) {
  try {
    await ProductsContainer.updateById(params.id_prod, body);
    res.status(201);
    res.json(body);
  } catch (error) {
    throw error;
  }
}

export async function deleteAll(req, res) {
  try {
    await ProductsContainer.deleteAll();
    res.status(201);
    res.json(await ProductsContainer.getAll());
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteById({ params }, res) {
  try {
    await ProductsContainer.deleteById(params.id_prod);
    res.status(201);
    res.json(await ProductsContainer.getAll());
  } catch (error) {
    throw error;
  }
}

// export { get, post, getById, deleteAll, createProductsTable };