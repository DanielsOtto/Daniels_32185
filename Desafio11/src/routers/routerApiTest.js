import { Router } from "express";
import { getFakerProducts } from "../controllers/fakerController.js";
const routerApiTest = Router();

routerApiTest.get('/', getFakerProducts);

export default routerApiTest;