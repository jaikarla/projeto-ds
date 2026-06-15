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

