export const port = process.env.PORT || 8080;

//MongoDB
//const cnxStrLocal = 'mongodb://root:mongopassword@localhost?authSource=admin'- o -'mongodb://localhost?authSource=admin'
export const CNX_STR = 'mongodb+srv://coderhouse:coderhouse@cluster0.qiy9g8n.mongodb.net/Coderhouse'; // conexion remota

export const DB_NAME = 'coderhouse';

export const PERSISTENCIA = 'mongodb';

// FILES
export const RUTA = '../containers/products.txt';
export const CART_ROUT = '../containers/cart.txt';