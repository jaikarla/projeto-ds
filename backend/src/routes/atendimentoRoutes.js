import { Router } from 'express';
import express from 'express';
import { validaProcedimentoSus } from '../middlewares/validaProcedimentoSus.js';
import { 
  criarAtendimentoController, 
  getAtendimentos, 
  getAtendimentoById, 
  updateAtendimento, 
  deleteAtendimento 
} from '../controllers/atendimentoController.js';

const router = Router();

router.use(express.json());

// CRUD completo mapeado na raiz do recurso (/atendimentos)
router.post('/', validaProcedimentoSus, criarAtendimentoController);
router.get('/', getAtendimentos);
router.get('/:id', getAtendimentoById);
router.put('/:id', validaProcedimentoSus, updateAtendimento);
router.delete('/:id', deleteAtendimento);

export default router;