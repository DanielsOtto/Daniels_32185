import bcrypt from 'bcrypt';
import { findByEmail } from '../models/userModel.js';
import { SECRET } from '../config/config.js';
import { logger } from '../log/pino.js';


export function encryptPassword(password) {
  return bcrypt.hashSync(password, SECRET);
}

export async function validatePassword(body) {
  try {
    const user = await findByEmail(body.email);
    const answer = bcrypt.compareSync(body.password, user.password);
    if (!answer) throw new Error('Invalid password');

    return true;
  } catch (err) {
    logger.error(err);
    throw new Error("error al validar");
  }
}