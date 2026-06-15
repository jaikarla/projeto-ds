import express from "express";
const router = express.Router();

//importando controller de estudantes
import {
  getEstudantes,
  getEstudanteById,
  createEstudante,
  updateEstudante,
  deleteEstudante
} from "../controllers/estudantesController.js";

router.get("/", getEstudantes);
router.get("/:id", getEstudanteById);
router.post("/", createEstudante);
router.put("/:id", updateEstudante);
router.delete("/:id", deleteEstudante);

export default router;
