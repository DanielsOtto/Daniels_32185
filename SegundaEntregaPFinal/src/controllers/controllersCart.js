import { ModelContainer } from '../models/ModelContainer.js';
import { randomUUID } from 'crypto';

async function postCreateCart(req, res) {
  try {
    const id = randomUUID();
    await ModelContainer.createCart(id);
    res.status(201);
    res.json({ 'Card ID': id });
  } catch (err) {
    throw err;
  }
}

async function postAddProducts({ body, params }, res) {
  try {
    const product = await ModelContainer.getByIdProd(body.id); // el id del objeto
    if (product) {
      await ModelContainer.saveCart(product);
      res.json(product);
    } else {
      res.status(404);
      res.json({ message: 'product not found' });
    }
  } catch (err) {
    throw err;
  }
}
export { postCreateCart };