import createKnex from 'knex';
import { mysqlConfig } from "../../config/config.js";
import { logger } from "../../config/pino.js";

const clientMSql = createKnex(mysqlConfig);

export async function createMessagesTable(tableNameMessages) {
  try {
    const table = await clientMSql.schema.hasTable(tableNameMessages);
    if (!table) {
      await clientMSql.schema.createTable(tableNameMessages, table => {
        table.string('id', 100).primary();
        table.string('date', 255);
        table.string('email', 255);
        table.text('message');
      });
    }

  } catch (err) {
    logger.error(err);
    throw err.message;
  }
}