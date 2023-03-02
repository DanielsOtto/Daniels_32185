import passport from "passport";
import { Router } from "express";
import { userInfo } from "../controllers/constrollersUsers.js";
import valAuthenticate from "../middlewares/authLogin.js";
import { logger } from "../log/pino.js";

const routerApiUser = Router();

routerApiUser.post('/users', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      logger.error(err.message)
      return res.status(400).json({ message: err.message });
    }
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    req.logIn(user, (err) => {
      if (err) {
        logger.error(err.message)
        return res.status(500).json({ message: 'Internal server error' });
      }
      return res.json(user);
    });
  })(req, res, next);
});



routerApiUser.get('/userinfo', valAuthenticate, userInfo); // nada

// "Crea un nuevo usuario (c/s permisos adicionales)" { { SERVER } } /api/users", "method"  "POST"   // x body
// "Obtener la información del usuario logueado", "url" "{{SERVER}}/api/userinfo", "method" "GET"  // user on


export default routerApiUser;