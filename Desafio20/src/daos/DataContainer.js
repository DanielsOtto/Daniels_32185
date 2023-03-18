import { nameMsgTable, MSG_PATH, mysqlConfig, PATH, PERSISTENCIA, nameProdTable } from "../config/config.js";
import createKnexClient from 'knex';

const clientSql = createKnexClient(mysqlConfig);

let productContainer;
let messagesContainer;

switch (PERSISTENCIA) { // cada repositorio tiene su propio switch de PERSISTENCIA, en un index ? CLASE 20 4HS 24m
  case 'mysql':
    const { DaoMysql } = await import('./DaoMysql.js');

    productContainer = new DaoMysql(clientSql, nameProdTable);
    messagesContainer = new DaoMysql(clientSql, nameMsgTable);
    break;
  default:
    const { DaoFile } = await import('./DaoFile.js');

    productContainer = new DaoFile(PATH);
    messagesContainer = new DaoFile(MSG_PATH);
    break;
}

export { productContainer, messagesContainer };

// DONDE LOS USO ? NO VAN MAS, van los index de repositorio