//simulação de banco de dados em memória para teste - deve ser retirado quando o banco de dados real for implementado
let faturistas = [];
let idAtual = 1; //id auto-incremental para novos faturistas

//listar todos os faturistas
export const listarFaturistas = () => {
  return faturistas;
};

//buscar por id
export const buscarFaturistaPorId = (id) => {
  return faturistas.find(f => f.id === Number(id));
};

//criar novo faturista
export const criarFaturista = (dados) => {
  const novo = {
    id: idAtual++, //atribui o id atual e depois incrementa para o próximo
    ...dados
  };

  faturistas.push(novo); //adiciona o novo faturista à "base de dados" em memória
  return novo;
};

//atualizar faturista
export const atualizarFaturista = (id, dados) => {
  const index = faturistas.findIndex(f => f.id === Number(id));

  if (index === -1) return null;

  faturistas[index] = {
    ...faturistas[index],
    ...dados
  };

  return faturistas[index];
};

//deletar faturista
export const deletarFaturista = (id) => {
  const index = faturistas.findIndex(f => f.id === Number(id));

  if (index === -1) return false;

  faturistas.splice(index, 1);
  return true;
};