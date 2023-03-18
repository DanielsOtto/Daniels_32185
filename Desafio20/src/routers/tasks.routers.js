// clase 19  ESTRUCTURA ONION
import { Router } from "express";
import { getNumbers, infoObjProcess } from "../controllers/desafio14-Fork.js";

const routerTasks = Router();
// DESAFIO 14

routerTasks.get('/api/info', infoObjProcess);
routerTasks.get('/api/randoms/:number?', getNumbers);

export default routerTasks;