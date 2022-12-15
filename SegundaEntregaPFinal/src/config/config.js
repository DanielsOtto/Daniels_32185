export const port = process.env.PORT || 8080;

//MongoDB
//const cnxStrLocal = 'mongodb://root:mongopassword@localhost:27017/coderhouse?authSource=admin'- o -'mongodb://localhost:27017/coderhouse?authSource=admin'
export const CNX_STR = 'mongodb+srv://coderhouse:coderhouse@cluster0.qiy9g8n.mongodb.net/Coderhouse'; // conexion remota
// export const CNX_STR = 'mongodb://localhost:27017/coderhouse' // local
export const DB_NAME = 'coderhouse';

// PERSISTENCIA
export const PERSISTENCIA = 'mongodb';

// FILES
export const RUTA = '../data/products.txt';
export const CART_ROUT = '../data/cart.txt';


