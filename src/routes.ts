import { Router } from "express";
import { CepController } from "./controllers/CepController";

const router = Router();
const cepController = new CepController();

// Rota para consultar CEP
router.get('/cep/:cep', cepController.consultarCep);

export { router };