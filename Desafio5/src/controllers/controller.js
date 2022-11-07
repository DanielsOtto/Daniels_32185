const element = require('../Container');
const { randomUUID } = require('crypto');

async function form(req, res) {
  try {
    res.render('form');
  } catch (error) {
    throw new Error('Error al cargar el formulario');
  }
};

async function get(req, res) {
  try {
    const prods = await element.getAll();
    res.render('historial', { prods, hayProductos: prods.length > 0 });
  } catch (error) {
    throw new Error('Se ha producido un error en el controlador GET');
  }
}

async function post({ body }, res) {
  try {
    const object = body;
    object.id = randomUUID();
    await element.save(object);
    res.status(201);
    res.redirect('/')
  } catch (error) {
    throw new Error('Se ha producido un error en el controlador POST');
  }
}

exports.controllerGet = get;
exports.controllerPost = post;
exports.controllerForm = form;