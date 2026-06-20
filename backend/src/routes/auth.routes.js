import { Router } from 'express';
import authController from '../controllers/authController.js';

const authRoutes = Router();

authRoutes.post('/login', authController.login);
authRoutes.post('/register', authController.register);
authRoutes.post('/cadastro', authController.register);
authRoutes.post('/recuperar', authController.recuperarSenha);
authRoutes.patch('/redefinir-senha', authController.redefinirSenha);

export default authRoutes;