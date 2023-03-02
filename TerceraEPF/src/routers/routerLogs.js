import passport from "passport";
import { Router } from "express";
import { LogOut } from "../controllers/controllersLogs.js";
import valAuthenticate from "../middlewares/authLogin.js";
import { logger } from "../log/pino.js";
const routerApiLogs = Router();

routerApiLogs.post('/login', (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      logger.error(err.message);
      return res.status(400).json({ message: err.message });
    }
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    req.logIn(user, (err) => {
      if (err) {
        logger.error(err.message);;
        return res.status(500).json({ message: 'Internal server error' });
      }
      return res.json(user);
    });
  })(req, res, next);
});

routerApiLogs.post('/logout', valAuthenticate, LogOut);

// "Login (user/admin) {{SERVER}}/login method":"POST"   // x body
// "Logout {{SERVER}}/logout method":"POST"  // nada

export default routerApiLogs;