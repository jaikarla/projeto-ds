import express from "express";
const router = express.Router();

//importa o controller de autenticação
import {
  login,
  register,
  getMe
} from "../controllers/authController.js";

router.post("/login", login);
router.post("/register", register);
router.get("/me", getMe);

export default router;