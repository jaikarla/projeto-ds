import Faturista from '../models/faturista.js'

//listar todos os faturistas
export const listarFaturistas = async () => {
  return await Faturistas.buscar_faturistas();
};

//buscar por id
export const buscarFaturistaPorId = async (id) => {
  return await Faturista.busca_faturista_id(id)
};

//criar novo faturista
export const criarFaturista = async (dados) => {
  return await Faturista.criar_faturista(dados)
};

//atualizar faturista
export const atualizarFaturista = async (id, dados) => {
  return await Faturista.atualizar_dados_faturista(id, dados)
};

//deletar faturista
export const deletarFaturista = (id) => {
  return await Faturista.remover_faturista(id)
};