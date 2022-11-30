import ContainerMysql from './ContainerMysql.js'
import { mysqlConfig } from '../config.js';
import createKnexClient from 'knex';
const clientSql = createKnexClient(mysqlConfig);
const tableName = 'messages';


export const MessagesContainer = new ContainerMysql(clientSql, tableName);

