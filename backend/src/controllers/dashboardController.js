const db = require('../config/db');

class DashboardController {
  async getResumo(req, res) {
    try {
      // executa múltiplas queries em paralelo 
      const [
        pacientesResult, 
        profissionaisResult, 
        atendimentosResult,
        procedimentosBpaC,
        procedimentosBpaI
      ] = await Promise.all([
        db.query('SELECT COUNT(*) FROM pacientes'),
        db.query('SELECT COUNT(*) FROM profissionais'),
        db.query('SELECT COUNT(*) FROM atendimentos'),
        db.query("SELECT COUNT(*) FROM procedimentos WHERE tipo = 'BPA-C'"),
        db.query("SELECT COUNT(*) FROM procedimentos WHERE tipo = 'BPA-I'")
      ]);

      // Estrutura limpa para enviar pro frontend
      const dadosDashboard = {
        cadastros: {
          pacientes: parseInt(pacientesResult.rows[0].count),
          profissionais: parseInt(profissionaisResult.rows[0].count)
        },
        producao: {
          totalAtendimentos: parseInt(atendimentosResult.rows[0].count),
          procedimentosDisponiveis: {
            bpaC: parseInt(procedimentosBpaC.rows[0].count),
            bpaI: parseInt(procedimentosBpaI.rows[0].count)
          }
        },
        // Pega o nome do faturista injetado pelo authMiddleware
        usuarioLogado: req.usuario.nome 
      };

      return res.status(200).json(dadosDashboard);

    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error);
      return res.status(500).json({ erro: 'Erro interno ao carregar o dashboard.' });
    }
  }
}

module.exports = new DashboardController();