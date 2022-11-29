import { mysqlConfig } from "../config.js";
import createKnex from 'knex';

const clientMSql = createKnex(mysqlConfig);

export async function createTable(tableName) {
  try {
    const table = await clientMSql.schema.hasTable(tableName);
    if (!table) {
      await clientMSql.schema.createTable(tableName, table => {
        table.string('id', 100).primary();
        table.string('name', 100);
        table.integer('price', 100);
        table.string('description', 200);
        table.string('thumbnail', 100);
      });
    }
  } catch (error) {
    throw error;
  }
}