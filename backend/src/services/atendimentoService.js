const { Atendimento, AtendimentoProcedimento } = require('../models');

const criarNovoAtendimento = async (dados, procedimentoValido) => {
  
  // 1. Cria a "capa" do atendimento na tabela principal
  // Se for BPA-C, paciente_id e cid podem ser nulos sem quebrar o banco
  const atendimentoCriado = await Atendimento.create({
    data_atendimento: dados.data_atendimento,
    cid: dados.cid || null,
    paciente_id: dados.paciente_id || null,
    profissional_id: dados.profissional_id
  });

  // 2. Faz o vínculo na tabela associativa 'atendimento_procedimentos'
  // Usa o ID gerado no passo anterior e a quantidade informada
  await AtendimentoProcedimento.create({
    atendimento_id: atendimentoCriado.id,
    procedimento_id: procedimentoValido.id,
    quantidade: dados.quantidade || 1
  });

  return atendimentoCriado;
};

module.exports = { criarNovoAtendimento };