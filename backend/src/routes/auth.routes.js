import express from "express";
const router = express.Router();

//rota para login
router.post("/login", (req, res) => {});

//rota para registro
router.post("/register", (req, res) => {});

//rota para obter informações do usuário autenticado
router.get("/me", (req, res) => {});

export default router;