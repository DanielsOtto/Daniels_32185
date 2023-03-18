import { getAllProducts, putProducts } from "../services/products.services.js";
import { logger } from "../config/pino.js";

export async function saveProduct({ body, io }, res) {
  try {
    const product = await putProducts(body);
    io.sockets.emit('updateProducts', await getAllProducts());
    res.status(201).json(product); // ojo con el orden, es como un return
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export async function recoverProducts(req, res) {
  try {
    const products = await getAllProducts();
    res.render('historial', { products, hayProductos: products.length > 0 });
  } catch (err) {
    logger.error(err);
    throw err;
  }
}