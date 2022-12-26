import ContainerMysql from './ContainerMysql.js';
import { mysqlConfig } from '../config.js';
import createKnexClient from 'knex';
const clientSql = createKnexClient(mysqlConfig);
const tableName = 'products';


export const ProductsContainer = new ContainerMysql(clientSql, tableName);