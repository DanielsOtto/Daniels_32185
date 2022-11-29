import mysqlContainer from './mysqlContainer.js';
import { mysqlConfig } from '../config.js';
import createKnexClient from 'knex';
const clientSql = createKnexClient(mysqlConfig);
const tableName = 'products';


export const productsContainer = new mysqlContainer(clientSql, tableName);