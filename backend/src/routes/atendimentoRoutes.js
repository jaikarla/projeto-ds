// Importamos o roteador do Express
const { Router } = require('express');

// Importamos nossas funções de Middleware e Controller
const { validaProcedimentoSus } = require('../middlewares/validaProcedimentoSus');
const { criarAtendimentoController } = require('../controllers/atendimentoController');

const router = Router();

// ROTA FINAL DO ENDPOINT
// Quando o front-end fizer um POST em '/atendimentos', o sistema:
// 1º Chama o validaProcedimentoSus (o segurança)
// 2º Se o segurança der o comando 'next()', chama o criarAtendimentoController (o gerente)
router.post('/', validaProcedimentoSus, criarAtendimentoController);

module.exports = router;