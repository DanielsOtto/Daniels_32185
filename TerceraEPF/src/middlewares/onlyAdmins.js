import { findByEmail } from "../models/userModel.js";
import { logger } from "../log/pino.js";

export async function onlyAdmins({ body }, res, next) {
  const user = await findByEmail(body.email);
  try {
    if (user.admin) {
      next();
    } else {
      res.status(403).json('Forbidden');
    }
  } catch (err) {
    logger.error(err);
    throw new Error('Error checking admin level');
  }
}