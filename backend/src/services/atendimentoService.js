// Importa o model do banco de dados no formato padrão do projeto
import Atendimento from '../models/atendimento.js';

// 1. Criar Atendimento 
export const criarNovoAtendimento = async (dados, procedimentoValido) => {
  // Ajustando a estrutura para bater com o que o método criar_atendimento do model espera
  const dadosFormatados = {
    data_atendimento: dados.data_atendimento,
    cid: dados.cid || null,
    paciente_id: dados.paciente_id || null,
    profissional_id: dados.profissional_id,
    procedimentos: [
      {
        procedimento_id: procedimentoValido.id,
        quantidade: dados.quantidade || 1
      }
    ]
  };

  return await Atendimento.criar_atendimento(dadosFormatados);
};

// 2. Listar todos os Atendimentos 
export const listarAtendimentos = async () => {
  return await Atendimento.buscar_atendimentos();
};

// 3. Buscar Atendimento por ID
export const buscarAtendimentoPorId = async (id) => {
  return await Atendimento.buscar_atendimento_id(id);
};

// 4. Deletar Atendimento 
export const deletarAtendimentoExistente = async (id) => {
  return await Atendimento.remover_atendimento(id);
};

