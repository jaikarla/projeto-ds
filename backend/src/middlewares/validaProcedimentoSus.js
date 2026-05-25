// Importamos o modelo Procedimento que reflete a tabela 'procedimentos' do banco
const { Procedimento } = require('../models');

const validaProcedimentoSus = async (req, res, next) => {
  // Extraímos os dados que o frontend (tela do celular) enviou no corpo da requisição (body)
  const { codigo_sus, paciente_id } = req.body;

  // REGRA 1: O código SUS não pode ser vazio. Se for, barramos logo aqui.
  if (!codigo_sus) {
    return res.status(400).json({ 
      status: "error", 
      message: "O código SUS é obrigatório para registrar o procedimento." 
    });
  }

  try {
    // Vamos no banco de dados buscar a linha inteira do procedimento usando o código informado
    const procedimento = await Procedimento.findOne({ 
      where: { codigo: codigo_sus } 
    });

    // REGRA 2: Se o 'findOne' retornar nulo, significa que o faturista digitou um código que não existe no SIGTAP
    if (!procedimento) {
      return res.status(404).json({ 
        status: "error", 
        message: `O código '${codigo_sus}' não foi encontrado na base do SIGTAP.` 
      });
    }

    // REGRA 3: A trava de segurança do BPA-I. 
    // Se no banco o tipo for 'BPA-I' e o frontend não mandou o 'paciente_id', nós bloqueamos.
    if (procedimento.tipo === 'BPA-I' && !paciente_id) {
      return res.status(400).json({
        status: "error",
        message: `O procedimento '${procedimento.nome}' é do tipo BPA-I. A identificação do paciente é obrigatória.`
      });
    }

    // Salvamos o objeto 'procedimento' (que veio do banco) dentro da própria requisição (req).
    // Assim, o Controller e o Service não vão precisar fazer outro SELECT no banco para saber o tipo ou o ID.
    req.procedimento = procedimento;
    
    // Passamos o bastão para a próxima função (que será o Controller)
    next();

  } catch (error) {
    // Se der erro de conexão com o banco, caímos aqui
    return res.status(500).json({ 
      status: "error", 
      message: "Erro interno na validação do banco de dados." 
    });
  }
};

module.exports = { validaProcedimentoSus };