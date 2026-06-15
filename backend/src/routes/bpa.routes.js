import express from "express";
const router = express.Router();

import {
  getBpas,
  getBpaById,
  createBpa,
  deleteBpa,
  getContadores, 
  exportarRelatorio
} from "../controllers/bpaController.js";

// CRUD Essencial do BPA
router.get("/", getBpas);
router.post("/", createBpa);
router.delete("/:id", deleteBpa);
router.get("/contadores", getContadores);
router.get("/exportar/:tipo/:formato", exportarRelatorio);
router.get("/:id", getBpaById);

export default router;
