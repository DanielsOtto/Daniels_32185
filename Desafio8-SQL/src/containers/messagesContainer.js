import mysqlContainer from '../containers/mysqlContainer.js'
import { mysqlConfig } from '../config.js';
import createKnexClient from 'knex';
const clientSql = createKnexClient(mysqlConfig);
const tableName = 'messages';


export const messagesContainer = new mysqlContainer(clientSql, tableName);

