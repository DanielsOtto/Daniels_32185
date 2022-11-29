import { messagesContainer } from '../containers/messagesContainer.js';
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
    res.json(await messagesContainer.getAll());
  } catch (err) {
    // throw err;
    throw new Error('Error in get method');
  }
}

async function post({ body }, res) {
  try {
    const object = body;
    object.id = randomUUID();
    await messagesContainer.save(object);
    res.status(201);
    res.json(object);
  } catch (err) {
    // throw err;
    throw new Error('Error in post method');
  }
}

async function getById({ params }, res) {
  try {
    const message = await messagesContainer.getById(params.id_msg);
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
    await messagesContainer.deleteAll();
    res.status(201);
    res.json(await messagesContainer.getAll());
  } catch (error) {
    throw error;
  }
}


export { get, post, getById, deleteAll, createMessagesTable };