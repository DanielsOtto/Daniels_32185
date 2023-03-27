import dotenv from 'dotenv';
import path from 'path';

// try {
//   await fs.promises.writeFile('./data/products.txt', '[]');
// } catch (err) {
//   throw new Error('Error al crear el archivo products');
// }

// conexion desafio 13
export const MONGO = 'mongodb+srv://coderhouse:coderhouse@cluster0.qiy9g8n.mongodb.net/users';

export const MSG_PATH = './data/messages.txt';
export const PATH = './data/products.txt';


//-----------------------------------------------------------

// desafio 14 
// con la consola bash anda bien la siguiente linea
// NODE_ENV=prod node src/main.js 
dotenv.config({
  path:
    process.env.NODE_ENV === 'prod'
      ? '.env'
      : 'finish.env'
});
// NODE_ENV esta configurado en el package.json

export const PERSISTENCIA = process.env.PERSISTENCIA;
// export const nameMsgTable = process.env.nameMsgTable;
// export const nameProdTable = process.env.nameProdTable;

export const MODO = process.env.MODO ?? 'fork';  // en vez de fork, false ?
export const PORT = process.env.PORT || 8080;
// que significa process.env.PORT ? utiliza el puerto del sistema Operativo,