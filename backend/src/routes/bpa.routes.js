import express from "express";
const router = express.Router();

import { validaProcedimentoSus } from "../middlewares/validaProcedimentoSus.js";

import {
  getBpas,
  getBpaById,
  createBpa,
  deleteBpa,
  calcularBpa,
  gerarRelatorio,
  exportarBpa
} from "../controllers/bpaController.js";

router.post("/", validaProcedimentoSus, createBpa);

//rotas para o BPA
router.post("/calcular", calcularBpa);
router.get("/relatorio", gerarRelatorio);
router.get("/exportar", exportarBpa);

router.get("/", getBpas);
router.get("/:id", getBpaById);
router.post("/", createBpa);
router.delete("/:id", deleteBpa);

export default router;

//-------------- ROTAS PARA TESTES --------------
//essas rotas são apenas para fins de teste e devem ser removidas ou substituídas por implementações reais posteriormente
//mantenhas como comentário. Use-as apenas p/ verificar as rotas quando necessário. lembre-se de comentar as de cima para realizar os teste com as de baixo, e vice-versa.

/*
router.get("/", (req, res) => {
  res.status(200).json({ message: "Listando BPAs" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Buscando BPA ${req.params.id}` });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "BPA criado com sucesso" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: `BPA ${req.params.id} atualizado` });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: `BPA ${req.params.id} removido` });
});

router.get("/", (req, res) => {
  res.json({ message: "Listando BPAs" });
});

router.post("/calcular", (req, res) => {
  res.json({ message: "Cálculo do BPA realizado" });
});

router.get("/relatorio", (req, res) => {
  res.json({ message: "Gerando relatório" });
});
export default router;*/