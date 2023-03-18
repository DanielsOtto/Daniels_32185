import { messagesContainer } from '../containers/DataContainer.js'; // PERSISTENCIA
import { createMessagesTable } from '../tables/createMessagesTable.js';
import { nameMsgTable } from './config.js';
import { randomUUID } from 'crypto';




export function configureSocket(server) {

  // SOCKETS
  io.on('connection', async socket => { // lleva async..
    socket.on('newMessage', async msg => {
      try {
        msg.date = new Date().toLocaleString();
        msg.id = randomUUID();
        createMessagesTable(nameMsgTable);
        await messagesContainer.save(msg); // guardo nuevo mensaje
        const arrayMsgs = await messagesContainer.getAll(); // obtengo todos los mensajes
        io.sockets.emit('show messages', arrayMsgs);
      } catch (err) {
        throw new Error('Error al conectar con los sockets newMessage');
      }
    });
  })
}