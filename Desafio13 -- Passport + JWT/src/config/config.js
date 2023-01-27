import * as fs from 'fs';
try {
  await fs.promises.writeFile('./data/products.txt', '[]');
} catch (err) {
  throw new Error('Error al crear el archivo products');
}

// conexion desafio 12
export const MONGO_CNS = 'mongodb+srv://coderhouse:coderhouse@cluster0.qiy9g8n.mongodb.net/sessions';
// conexion desafio 13
export const MONGO = 'mongodb+srv://coderhouse:coderhouse@cluster0.qiy9g8n.mongodb.net/users';


export const MSG_PATH = './data/messages.txt';
export const PATH = './data/products.txt';
export const PERSISTENCIA = 'mysql';
export const nameMsgTable = 'messages';
export const nameProdTable = 'products';
export const PORT = process.env.PORT || 8080;
// que significa process.env.PORT ? utiliza el puerto del sistema Operativo,
// si no existe, utiliza el puerto 8080

export const mysqlConfig = {
  client: 'mysql2',
  connection: 'mysql://localhost:3306/coderhouse'
}; // aca se guardan los chats/productos pero no me los muestra desde el desafio 13 - no se xq

