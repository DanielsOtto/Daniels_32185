const element = require('../Container');
const { randomUUID } = require('crypto');

async function get(req, res) {
  try {
    res.json(await element.getAll());
  } catch (error) {
    throw new Error('Se ha producido un error en controllerGet');
  }
}

async function getById({ params }, res) {
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

async function post({ body }, res) {
  try {
    const object = body;
    object.id = randomUUID();
    await element.save(object);
    res.status(201);
    res.json(object);
    // res.render('/api/products', object)
  } catch (error) {
    throw new Error('Se ha producido un error en controllerPost');
  }
}

async function putById({ body, params }, res) {

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

async function deleteById({ params }, res) {
  try {
    await element.deleteById(params.id);
    res.json({ message: 'eliminado correctamente' });
  } catch (error) {
    throw new Error('Ha ocurrido un error en el controladorDeleteById');
  }
}

exports.controllerGet = get;
exports.controllerGetById = getById;
exports.controllerPost = post;
exports.controllerPutById = putById;
exports.controllerDeleteById = deleteById;
