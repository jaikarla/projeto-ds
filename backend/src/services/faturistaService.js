import Faturista from '../models/faturista.js';
// Bcrypt usado para hash seguro de senha no cadastro de faturista.
import bcrypt from 'bcrypt';

// listar todos os faturistas
export const listarFaturistas = async () => {
  // CORRE��O: Removido o "s" de Faturistas.
  return await Faturista.buscar_faturistas();
};

// buscar por id
export const buscarFaturistaPorId = async (id) => {
  return await Faturista.busca_faturista_id(id);
};

// criar novo faturista
export const criarFaturista = async (dados) => {
  const { nome, email, senha, cpf, telefone} = dados;

  // CORRE��O: Valida��o de seguran�a antes do replace
  if (!cpf || !senha) {
    throw new Error("Campos obrigat�rios (CPF ou Senha) est�o faltando ou vazios.");
  }

  // 1. Criptografa a senha antes de salvar no banco de dados.
  const saltRounds = 10;
  const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

  // 2. Prepara os dados limpos convertendo o CPF e mantendo a senha segura.
  const dadosFormatados = {
    nome,
    email,
    senha: senhaCriptografada,
    cpf: String(cpf).replace(/\D/g, ''),
    telefone,
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

// atualizar senha do faturista
export const atualizarSenhaFaturista = async (id, { senha_atual, nova_senha }) => {
  const faturista = await Faturista.busca_faturista_id_com_senha(id);

  if (!faturista) {
    throw new Error('Faturista não encontrado');
  }

  const senhaAtualValida = await bcrypt.compare(senha_atual || '', faturista.senha);
  if (!senhaAtualValida) {
    throw new Error('Senha atual inválida');
  }

  const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{6,}$/;
  if (!senhaRegex.test(nova_senha || '')) {
    throw new Error('Senha inválida. Deve ter no mínimo 6 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 símbolo.');
  }

  const senhaCriptografada = await bcrypt.hash(nova_senha, 10);
  await Faturista.atualizar_senha_faturista(id, senhaCriptografada);
};

// deletar faturista
export const deletarFaturista = async (id) => {
  return await Faturista.remover_faturista(id);
};
