import { nameMsgTable, MSG_PATH, mysqlConfig, PATH, PERSISTENCIA, nameProdTable } from "../config/config.js";
import FileContainer from "./FileContainer.js";
import mySqlContainer from "./mySqlContainer.js";
import createKnexClient from 'knex';

const clientSql = createKnexClient(mysqlConfig);
export let productContainer;
export let messagesContainer;

console.log(PERSISTENCIA);

switch (PERSISTENCIA) {
  case 'mysql':
    productContainer = new mySqlContainer(clientSql, nameProdTable);
    messagesContainer = new mySqlContainer(clientSql, nameMsgTable);
    break;
  default:
    productContainer = new FileContainer(PATH);
    messagesContainer = new FileContainer(MSG_PATH);
    break;
}