// clase 19  ESTRUCTURA ONION
import { Router } from "express";
import isAuthenticated from "../middlewares/authenticated.js";
import fileOrTableExist from '../middlewares/fileOrTableExist.js';
import {
  showMenu,
  accesProfile
} from '../controllers/passportController.js';
import { showForm } from '../controllers/formsController.js'

const routerMenu = Router();

routerMenu.get('/menu', showMenu); // botones registro y 
routerMenu.get('/', isAuthenticated, showForm); // sacar fileExist
//---agregado no pedido
routerMenu.get('/profile', isAuthenticated, accesProfile); // panel de control -anda

export default routerMenu;


