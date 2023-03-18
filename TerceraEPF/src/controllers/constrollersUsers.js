import { logger } from "../log/pino.js";
import { findByEmail } from "../models/userModel.js";

export async function userInfo({ body }, res) {
  const { email } = body;
  try {
    let user = await findByEmail(email);
    return res.json(user);
  } catch (e) {
    logger.error(e);
    return res.json({ error: e.message })
  }
}