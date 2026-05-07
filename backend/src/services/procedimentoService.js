//simulação de banco de dados em memória para teste - deve ser retirado quando o banco de dados real for implementado
let procedimentos = [];
let idAtual = 1; //id auto-incremental para novos procedimentos

//listar todos os procedimentos
export const listarProcedimentos = () => {
  return procedimentos;
};

//buscar por id
export const buscarProcedimentoPorId = (id) => {
  return procedimentos.find(p => p.id === Number(id));
};

//criar novo procedimento
export const criarProcedimento  = (dados) => {
  const novo = {
    id: idAtual++, //atribui o id atual e depois incrementa para o próximo
    ...dados
  };

  procedimentos.push(novo); //adiciona o novo procedimento à "base de dados" em memória
  return novo;
};

//atualizar procedimento
export const atualizarProcedimento = (id, dados) => {
  const index = procedimentos.findIndex(p => p.id === Number(id));

  if (index === -1) return null;

  procedimentos[index] = {
    ...procedimentos[index],
    ...dados
  };

  return procedimentos[index];
};

//deletar procedimento
export const deletarProcedimento = (id) => {
  const index = procedimentos.findIndex(p => p.id === Number(id));

  if (index === -1) return false;

  procedimentos.splice(index, 1);
  return true;
};