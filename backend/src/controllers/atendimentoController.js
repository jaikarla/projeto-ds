// Importamos o Service que contém as regras pesadas de inserção
const atendimentoService = require('../services/atendimentoService');

const criarAtendimentoController = async (req, res) => {
  try {
    // Pegamos todos os dados que vieram do formulário do aplicativo
    const dadosCorpo = req.body;
    
    // Recuperamos o procedimento que o nosso Middleware validou e guardou no 'req'
    const procedimentoDaRequisicao = req.procedimento; 

    // Mandamos os dados para o Service criar os registros nas tabelas do banco
    const resultado = await atendimentoService.criarNovoAtendimento(dadosCorpo, procedimentoDaRequisicao);

    // Se chegou aqui, as inserções deram certo. Retornamos o status 201 (Created)
    return res.status(201).json({
      status: "success",
      message: "Procedimento registrado com sucesso!",
      data: {
        atendimento_id: resultado.id,               // ID para o front-end saber o código gerado
        tipo_faturamento: procedimentoDaRequisicao.tipo // Retorna se foi BPA-C ou BPA-I
      }
    });

  } catch (error) {
    // Qualquer erro no Service (ex: falha de constraint no banco) cai neste catch
    console.error("Falha no Controller de Atendimento:", error);
    return res.status(500).json({ 
      status: "error", 
      message: "Falha na comunicação com o banco ao salvar o atendimento." 
    });
  }
};

module.exports = { criarAtendimentoController };