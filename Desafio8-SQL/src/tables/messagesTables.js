import { mysqlConfig } from "../config.js";
import createKnex from 'knex';

const clientMSql = createKnex(mysqlConfig);

export async function createTableAsync(tableName) {
  try {
    const table = await clientMSql.schema.hasTable(tableName);
    if (!table) {
      await clientMSql.schema.createTable(tableName, table => {
        table.string('id', 100).primary();
        table.string('name', 100);
        table.string('message', 100);
      });
    }
  } catch (error) {
    throw error;
  }
}



// export async function createTable(tableName) {
//   try {
//     clientMSql.schema.hasTable(tableName)
//       .then(exists => {
//         if (!exists) {
//           clientMSql.schema.createTable(tableName, tabla => {
//             tabla.increments('id'),
//               tabla.string('name'),
//               tabla.integer('price'),
//               tabla.string('description'),
//               tabla.string('thumbnail')
//           })
//             .then(() => {
//               console.log(`table "${tableName}" created!`);
//             })
//         } else {
//           console.log(`The table "${tableName}" exist!. No need changes`);
//         }
//       });
//   } catch (error) {
//     throw new Error(error);
//   }
// }



