import { Router } from "express";
import { fileOrTableExist } from "../controllers/controllerProds.js";
import {
    showForm,
    recoverProducts,
    saveProduct,
    showLogin,
    register,
    logOff,

} from "../controllers/handlebarsController.js";

export const routerWebProducts = Router(); // no olvidarse el export

routerWebProducts.get('/', fileOrTableExist, showForm);
routerWebProducts.get('/products', fileOrTableExist, recoverProducts);
routerWebProducts.post('/products', fileOrTableExist, saveProduct);

// Desafio 12
routerWebProducts.get('/registro', showLogin)
routerWebProducts.post('/registro', register); // register
routerWebProducts.get('/desconectarse', logOff); // desconectarse




//instalar express-session INSTALADO
//instalar connect-mongo INSTALADO
// get /registro -- post /registro -- en ambos se guarda el user en cookies con expiracion
// get /registro -- muestra el cartel de bienvenida con el boton para desconectarse
// post /desconectarse (logout)
// para buscar usuario hay q leer la cookie (las cookies se encuentran en req)
// utilizar middlewares si se requieren
// recordar middleware session 3h 40m  //--// ejemplo session-express
// 3h 41 45 el middleware session crea una session vacia, si no la usa la borra-- req.session.user -- session genera cookie
//3h 44 52 explica middleware session
// lista de usuarios ??? 