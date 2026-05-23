import Faturista from '../models/faturista.js';
import bcrypt from 'bcryptjs';

// listar todos os faturistas
export const listarFaturistas = async () => {
  // CORREÇÃO: Removido o "s" de Faturistas.
  return await Faturista.buscar_faturistas();
};

// buscar por id
export const buscarFaturistaPorId = async (id) => {
  return await Faturista.busca_faturista_id(id);
};

// criar novo faturista
export const criarFaturista = async (dados) => {
  const { nome, email, senha, cpf, cns_profissional } = dados;

  // CORREÇÃO: Validação de segurança antes do replace
  if (!cpf || !cns_profissional || !senha) {
    throw new Error("Campos obrigatórios (CPF, CNS ou Senha) estão faltando ou vazios.");
  }

  // 1. Criptografa a senha para proteger o acesso do faturista
  const saltRounds = 10;
  const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

  // 2. Prepara os dados limpos convertendo para String com segurança
  const dadosFormatados = {
    nome,
    email,
    senha: senhaCriptografada,
    cpf: String(cpf).replace(/\D/g, ''),
    cns_profissional: String(cns_profissional).replace(/\D/g, ''),
    role: 'FATURISTA' 
  };

  // 3. Manda para o model salvar no banco de dados
  const novoFaturista = await Faturista.criar_faturista(dadosFormatados);

  return novoFaturista;
};

// atualizar faturista
export const atualizarFaturista = async (id, dados) => {
  return await Faturista.atualizar_dados_faturista(id, dados);
};

// deletar faturista
export const deletarFaturista = async (id) => {
  return await Faturista.remover_faturista(id);
};