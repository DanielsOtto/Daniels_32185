import {
  get,
  post,
  getById,
  deleteAll,
  createMessagesTable,
  updateById,
  deleteById
} from '../controllers/messagesControllers.js';
import { Router } from 'express';

const routerApiMessages = Router();

routerApiMessages.get('/', createMessagesTable, get);
routerApiMessages.post('/', createMessagesTable, post);
routerApiMessages.get('/:id_msg', createMessagesTable, getById);
routerApiMessages.put('/:id_msg', createMessagesTable, updateById);
routerApiMessages.delete('/', createMessagesTable, deleteAll);
routerApiMessages.delete('/:id_msg', createMessagesTable, deleteById);

export default routerApiMessages;