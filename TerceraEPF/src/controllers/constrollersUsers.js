import { logger } from "../log/pino.js";
import { findByEmail } from "../models/userModel.js";

export async function userInfo({ body }, res) {
  const { email } = body;
  try {
    let user = await findByEmail(email);
    if (!user) throw new Error('ERROR in user info');
    return res.json(user);
  } catch (e) {
    logger.error(e);
    return res.json({ error: e.message })
  }
}