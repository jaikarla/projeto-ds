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

//-------------- ROTAS PARA TESTES --------------
//essas rotas são apenas para fins de teste e devem ser removidas ou substituídas por implementações reais posteriormente
//mantenhas como comentário. Use-as apenas p/ verificar as rotas quando necessário. lembre-se de comentar as de cima para realizar os teste com as de baixo, e vice-versa.

/*
router.get("/", (req, res) => {
  res.status(200).json({ message: "Listando procedimentos" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Buscando procedimento ${req.params.id}` });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "Procedimento criado com sucesso" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: `Procedimento ${req.params.id} atualizado` });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: `Procedimento ${req.params.id} removido` });
});

export default router;*/