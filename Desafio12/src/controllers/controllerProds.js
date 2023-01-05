import * as fs from 'fs';
import { randomUUID } from 'crypto';
import { PATH, PERSISTENCIA, nameProdTable } from '../config/config.js';
// import { productContainer } from '../containers/ProductsContainer.js';
import { productContainer } from '../containers/DataContainer.js';
import createProductsTable from '../tables/createProductsTable.js'


export async function getProducts(req, res) {
  try {
    const array = await productContainer.getAll();
    if (array.length <= 0) {
      res.status(404);
      res.json({ mensaje: 'Archivo vacio' });
    } else {
      res.status(200);
      res.json(array);
    }
  } catch (err) {
    console.log(err);
    throw new Error('Error al obtener los productos');
  }
}

export async function getById({ params }, res) {
  try {
    const prod = await productContainer.getById(params.id);
    if (!prod) {
      res.status(404);
      res.json({ message: 'Elemento no encontrado' });
    } else {
      res.status(200);
      res.json(prod);
    }
  } catch (err) {
    console.log(err);
    throw new Error('Error al obtener un producto por ID');
  }
}

export async function saveProduct({ body }, res) {
  try {
    const object = body;
    object.id = randomUUID();
    await productContainer.save(object);
    res.status(201);
    res.json(object);
  } catch (err) {
    console.log(err);
    throw new Error('Error al guardar un producto');
  }
}

export async function updateById({ body, params }, res) {
  try {
    const object = body;
    const prod = await productContainer.updateById(params.id, object);
    if (!prod) {
      res.status(404);
      res.json({ mensaje: 'producto no encontrado' });
    } else {
      res.status(200);
      res.json(prod);
    }
  } catch (err) {
    console.log(err);
    throw new Error('Error al actualizar un producto');
  }
}

export async function deleteAll(req, res) {
  try {
    await productContainer.deleteAll();
    res.status(200);
    res.json({ mensaje: 'Productos eliminados' });
  } catch (err) {
    console.log(err);
    throw new Error('Error al eliminar los productos');
  }
}

export async function deleteById({ params }, res) {
  try {
    await productContainer.deleteById(params.id);
    res.status(200);
    res.json({ mensaje: 'objeto eliminado' });
  } catch (err) {
    console.log(err);
    throw new Error('Error al eliminar un producto mediante ID');
  }
}

export async function fileOrTableExist(req, res, next) { // SI NO EXISTE EL ARCHIVO, lo crea
  try {
    if (PERSISTENCIA === 'mysql') {
      createProductsTable(nameProdTable);
      next();
    } else {
      if (fs.existsSync(PATH)) { // revisa si existe el archivo de productos (por la ruta que tiene por defecto)
        next();
      } else {
        try {
          await fs.promises.writeFile(PATH, '[]');
        } catch (err) {
          throw new Error('Error al crear el archivo products');
        }
        next();
      }
    }
  } catch (error) {

  }
}