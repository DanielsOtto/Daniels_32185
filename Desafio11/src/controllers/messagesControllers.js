import { MessagesContainer } from '../containers/MessagesContainer.js';
import { randomUUID } from 'crypto';
import { createTableAsync } from '../tables/messagesTables.js';
const tableName = 'messages';

async function createMessagesTable(req, res, next) { // middleware para todas las rutas
  try {
    await createTableAsync(tableName);
    next();
  } catch (error) {
    throw error;
  }
}

async function get(req, res) {
  try {
    res.json(await MessagesContainer.getAll());
  } catch (err) {
    // throw err;
    throw new Error('Error in get method');
  }
}

async function post({ body }, res) {
  try {
    const object = body;
    object.id = randomUUID();
    await MessagesContainer.save(object);
    res.status(201);
    res.json(object);
  } catch (err) {
    // throw err;
    throw new Error('Error in post method');
  }
}

async function getById({ params }, res) {
  try {
    const message = await MessagesContainer.getById(params.id_msg);
    if (!message) {
      res.status(404);
      res.json({ message: 'Message not found' });
    } else {
      res.status(201);
      res.json(message);
    }
  } catch (error) {
    // throw error;
    throw new Error('Error in get by ID method');
  }
}

async function deleteAll(req, res) {
  try {
    await MessagesContainer.deleteAll();
    res.status(201);
    res.json(await MessagesContainer.getAll());
  } catch (error) {
    throw error;
  }
}

async function updateById({ body, params }, res) {
  try {
    await MessagesContainer.updateById(params.id_msg, body);
    res.status(201)
    res.json(body);
  } catch (error) {
    throw error;
  }
}

async function deleteById({ params }, res) {
  try {
    await MessagesContainer.deleteById(params.id_msg);
    res.status(201)
    res.json(await MessagesContainer.getAll());
  } catch (error) {
    throw error;
  }
}


export { get, post, getById, deleteAll, createMessagesTable, updateById, deleteById };