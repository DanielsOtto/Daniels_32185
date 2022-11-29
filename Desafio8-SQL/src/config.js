export const mysqlConfig = {
  client: 'mysql2',
  connection: 'mysql://localhost:3306/coderhouse'
};

export const port = process.env.PORT || 8080;


// INFORMACION  KNEX
// import createKnexClient from 'knex';
// // este import trae una funcion, que va a crear un cliente, el cual necesita
// // una cierta configuracion para crearse. Un objeto que tiene que tener ciertos
// // detalles.
// // primero, cual es el controlador que tiene que usar para conectarse a la bbdd
// // segundo, necesitamos decirle con que datos se va a conectar a la bbdd

// const clientSql = createKnexClient({
//   client: 'mysql2',
//   connection: 'mysql://localhost:3306/coderhouse' //string de conexion sin credenciales de usuario
//   // string de conexion ~ es un mecanismo con el cual vamos a decirle a que direccion
//   // se va a conectar el cliente para encontrar la bbdd, es similar a la url de mi base de datos 'localhost:8080'
//   // string de conexion CON CREDENCIALES de usuario -- 'mysql://user:pass@localhost:3306/bbdd'

//   // frase martin →→ El cliente se conecta con nuestro servidor, y nuestro servidor se conecta con el servidor de bbdd-
// });