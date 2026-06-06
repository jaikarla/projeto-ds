// OBS: este service usa o model de Profissionais e filtra por tipo = 'estudante
// Estudantes não possuem tabel a propria no banco de dados


import Profissional from "../models/profissional.js";

//listar todos os estudantes
export const listarEstudantes = async () => {
  return await Profissional.buscar_profissional_tipo('estudante')
};

//buscar por id - verifica se o registro encontrado é do tipo estudante
export const buscarEstudantePorId = async (id) => {
  const registro = await Profissional.buscar_profissional_tipo('estudante')

  // não retorna um profissional comum pelo id
  if (!registro || registro.tipo !== 'estudante') return null

  return registro
};

//criar novo estudante na tabela profissionais
export const criarEstudante = async (dados) => {

  //campos obrigatórios
  if(!dados.nome || !dados.cpf || !dados.cns || !dados.matricula ) {
    throw new Error("Todos os campos obrigatórios devem ser preenchidos.");
  }

  // validação cpf 
   const cpfRegex = /^\d{11}$/;

  if (!cpfRegex.test(dados.cpf)) {
    throw new Error("CPF inválido. Deve conter exatamente 11 dígitos numéricos.");
  }

  //validação cns
  const cnsRegex = /^\d{15}$/;

  if (!cnsRegex.test(dados.cns)) {
    throw new Error("CNS inválido. Deve conter exatamente 15 dígitos numéricos.");
  }

  //validação data de nascimento
  const dataNascimento = new Date(dados.dataNascimento);

  if (isNaN(dataNascimento.getTime())) {
    throw new Error("Data de nascimento inválida. Deve estar no formato YYYY-MM-DD.");
  }

  const hoje = new Date(); // para não permitir datas futuras

  if (dataNascimento > hoje) {
    throw new Error("Data de nascimento não pode ser futura");
  }

  //duplicidade de matricula
  const matriculaExistente = await Profissional.buscar_estudante_matricula(dados.matricula)
  if (matriculaExistente){
    throw new Error("Matrícula já cadastrada")
  }

  try {
  return await Profissional.criar_profissional({
    ...dados,
    cro: null,
    cbo: 'Estudante',
    tipo: 'estudante'
  })
} catch (error) {
  if (error.code === '23505' || error.message.includes('matricula')) {
    throw new Error("Matrícula já cadastrada")
  }

  throw error
}
}

//atualizar estudante
export const atualizarEstudante = async (id, dados) => {
  
  //verifica se o registro existe e é existe
  const registro = await Profissional.buscar_profissional_id(id)
  if (!registro || registro.tipo !== 'estudante') return null

  // garantir que o tipo não seja alterado 
  return await Profissional.atualizar_dados_profissional(id,{
    ...dados,
    cbo: 'Estudante',
    tipo: 'estudante'
  })
};

//deletar estudante
export const deletarEstudante = async (id) => {
  
  // verificar se é estudante antes de remover
  const registro = await Profissional.buscar_profissional_id(id)
  if (!registro || registro.tipo !== 'estudante') return false

  await Profissional.remover_profissional(id)
  return true
};