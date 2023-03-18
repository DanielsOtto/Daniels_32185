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
routerMenu.get('/', fileOrTableExist, isAuthenticated, showForm);
//---agregado no pedido
routerMenu.get('/profile', fileOrTableExist, isAuthenticated, accesProfile); // panel de control -anda

export default routerMenu;


