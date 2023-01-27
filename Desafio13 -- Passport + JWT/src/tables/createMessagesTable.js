import { mysqlConfig } from "../config/config.js";
import createKnex from 'knex';

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


    // await clientMSql.schema.hasTable(tableNameMessages).then(function (exists) {
    //   if (!exists) {
    //     return clientMSql.schema.createTable(tableNameMessages, function (t) {
    //       t.string('id', 100).primary();
    //       t.string('date', 255);
    //       t.string('email', 255);
    //       t.text('message');
    //     });
    //   }
    // })

  } catch (err) {
    console.log(err)
    // throw new Error('Error al crear las tablas para mensajes');
  }
}