import { mysqlConfig } from "../config/config.js";
import createKnex from 'knex';

const clienteMsql = createKnex(mysqlConfig);

export default async function createProductsTable(tableName) {
  try {
    const table = await clienteMsql.schema.hasTable(tableName)
    if (!table) {
      await clienteMsql.schema.createTable(tableName, table => {
        table.string('id', 100).primary();
        table.string('name', 100);
        table.integer('price', 100);
        table.text('description');
        table.string('thumbnail', 100);
      });
    }
  } catch (err) {
    console.log(err)
    throw new Error('Error al crear la tabla de productos');
  }
}