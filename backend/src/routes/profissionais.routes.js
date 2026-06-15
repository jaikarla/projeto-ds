import express from "express";
const router = express.Router();

//importando controller de profissionais
import {
  getProfissionais,
  getProfissionalById,
  createProfissional,
  updateProfissional,
  deleteProfissional
} from "../controllers/profissionalController.js";

router.get("/", getProfissionais);
router.get("/:id", getProfissionalById);
router.post("/", createProfissional);
router.put("/:id", updateProfissional);
router.delete("/:id", deleteProfissional);

export default router;

