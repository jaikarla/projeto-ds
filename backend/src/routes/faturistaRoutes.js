import { Router } from 'express';
import { middlewareValidaCadastro } from '../middlewares/validaFaturista.js';
import { criarFaturistaController } from '../controllers/faturistaController.js';

const router = Router();

// Rota POST para o cadastro
// A ordem importa muito: primeiro valida, depois controla.
router.post('/cadastro', middlewareValidaCadastro, criarFaturistaController);

export default router;