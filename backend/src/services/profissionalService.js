import Profissional from '../models/profissional.js'

//listar todos os profissionais
export const listarProfissionais = async () => {
    return await Profissional.buscar_profissionais(id)
};

//buscar por id
export const buscarProfissionalPorId = async (id) => {
  return await Profissional.buscar_profissional_id(id)
};

//criar novo profissional
export const criarProfissional = async (dados) => {
  return await Profissional.criar_profissional(dados)
};

//atualizar profissional
export const atualizarProfissional = (id, dados) => {
  return Profissional.atualizar_dados_profissional(id, dados)
};

// deletar profissional
export const deletarProfissional = async (id) => {
  return await Profissional.remover_profissional(id)
}