// hay que armar el modelo de usuario
import { randomUUID } from 'crypto';

import { chosenUsersContainers as users } from "../dao/DataContainer.js";
import { encryptPassword } from "../utils/hashPass.js";
import { createCart } from './cartModel.js';
import { logger } from "../log/pino.js";

// --- User Model es usado por el controlador
export async function createAccount(body) {
  try {
    const idCart = await createCart();
    const id = randomUUID();
    body.password = encryptPassword(body.password);
    const user = { id, ...body, idCart };
    user.admin = false;
    const saved = await users.save(user);
    return saved;
  } catch (err) {
    logger.error(err);
    throw new Error('error creating user');
  }
}

// buscar por email
export async function findByEmail(email) {
  try {
    const user = await users.getByEmail(email);
    return user;
  } catch (err) {
    logger.error(err);
    throw new Error(err.message);
  }
}

