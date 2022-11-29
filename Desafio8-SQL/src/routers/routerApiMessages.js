import {
  get,
  post,
  getById,
  deleteAll,
  createMessagesTable
} from '../controllers/messagesContainer.js';
import { Router } from 'express';

const routerApiMessages = Router();

routerApiMessages.get('/', createMessagesTable, get);
routerApiMessages.post('/', createMessagesTable, post);
routerApiMessages.get('/:id_msg', createMessagesTable, getById);
routerApiMessages.delete('/', createMessagesTable, deleteAll);

export default routerApiMessages;