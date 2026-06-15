import express from "express";
const router = express.Router();

// Importando o novo middleware de valida��o
import { validaProcedimento } from "../middlewares/validaProcedimento.js";

// Importando o controller de procedimentos
import {
  getProcedimentos,
  getProcedimentoById,
  createProcedimento,
  updateProcedimento,
  deleteProcedimento
} from "../controllers/procedimentosController.js";

router.get("/", getProcedimentos);
router.get("/:id", getProcedimentoById);

// Aplicando o middleware no POST e no PUT
router.post("/", validaProcedimento, createProcedimento);
router.put("/:id", validaProcedimento, updateProcedimento);

router.delete("/:id", deleteProcedimento);

export default router;
