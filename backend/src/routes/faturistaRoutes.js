import { Router } from 'express';
import { middlewareValidaCadastro } from '../middlewares/validaFaturista.js';
import {
  atualizarFaturistaController,
  atualizarSenhaFaturistaController,
  buscarFaturistaController,
  criarFaturistaController,
  deletarFaturistaController
} from '../controllers/faturistaController.js';

const router = Router();

router.post('/cadastro', middlewareValidaCadastro, criarFaturistaController);
router.get('/:id', buscarFaturistaController);
router.put('/:id', atualizarFaturistaController);
router.patch('/:id/senha', atualizarSenhaFaturistaController);
router.delete('/:id', deletarFaturistaController);

export default router;
