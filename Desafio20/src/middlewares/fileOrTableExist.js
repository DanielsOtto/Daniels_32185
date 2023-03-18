import * as fs from 'fs';
import { PATH, PERSISTENCIA, nameProdTable } from '../config/config.js';
import createProductsTable from '../dataAccess/tables/createProductsTable.js';
import { logger } from '../config/pino.js';

export default async function fileOrTableExist(req, res, next) { // SI NO EXISTE EL ARCHIVO, lo crea
  try {
    if (PERSISTENCIA === 'mysql') {
      createProductsTable(nameProdTable);
      next();
    } else {
      if (fs.existsSync(PATH)) { // revisa si existe el archivo de productos (por la ruta que tiene por defecto)
        next();
      } else {
        try {
          await fs.promises.writeFile(PATH, '[]');
        } catch (err) {
          throw new Error('Error al crear el archivo products');
        }
        next();
      }
    }
  } catch (err) {
    logger.error(err);
    throw err;
  }
}