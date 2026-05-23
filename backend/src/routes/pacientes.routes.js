import express from "express";
const router = express.Router();

//importando controller de pacientes
import {
  getPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  deletePaciente
} from "../controllers/pacientesController.js";

router.get("/", getPacientes);
router.get("/:id", getPacienteById);
router.post("/", createPaciente);
router.put("/:id", updatePaciente);
router.delete("/:id", deletePaciente);

export default router;

//-------------- ROTAS PARA TESTES --------------
//essas rotas são apenas para fins de teste e devem ser removidas ou substituídas por implementações reais posteriormente
//mantenhas como comentário. Use-as apenas p/ verificar as rotas quando necessário. lembre-se de comentar as de cima para realizar os teste com as de baixo, e vice-versa.

/*
router.get("/", (req, res) => {
  res.status(200).json({ message: "Listando pacientes" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Buscando paciente ${req.params.id}` });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "Paciente criado com sucesso" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: `Paciente ${req.params.id} atualizado` });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: `Paciente ${req.params.id} removido` });
});

export default router;*/