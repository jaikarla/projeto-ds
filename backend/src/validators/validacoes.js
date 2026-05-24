//este arquivo é para add validações genéricas de profissionais/estudantes e pacientes
//isso evita que tenhamos duplicação de código e facilita a manutenção

//----------PROFISSIONAL/ESTUDANTE & PACIENTE ----------

//validar CPF
export const validarCPF = (cpf) => {

  const cpfRegex = /^\d{11}$/;

  if (!cpfRegex.test(cpf)) {
    throw new Error("CPF deve conter 11 dígitos numéricos.");
  }

};

//validar CNS
export const validarCNS = (cns) => {

  const cnsRegex = /^\d{15}$/;

  if (!cnsRegex.test(cns)) {
    throw new Error("CNS deve conter 15 dígitos numéricos.");
  }

};

//validar CRO
export const validarCRO = (cro) => {

  const croRegex = /^[A-Z]{2}-\d{5}$/i;

  if (!croRegex.test(cro)) {
    throw new Error("CRO inválido. Use XX-12345.");
  }

};

//validar tipo (profissional ou estudante)
export const validarTipo = (tipo) => {

  const tiposValidos = [
    "profissional",
    "estudante"
  ];

  if ( !tipo || !tiposValidos.includes(tipo.toLowerCase()) ) {
    throw new Error("Tipo deve ser profissional ou estudante.");
  }

};

//validar campos obrigatórios
export const validarCamposObrigatorios = (campos) => {

  for (const campo of campos) {
    if (
      campo === undefined ||
      campo === null ||
      campo === ""
    ) {
      throw new Error("Todos os campos obrigatórios devem ser preenchidos.");
    }

  }

};

//---------- APENAS PACIENTE ----------

//validar o sexo do paciente
export const validarSexo = (sexo) => {

  const sexosValidos = [
    "MASCULINO",
    "FEMININO"
  ];

  if (!sexo || !sexosValidos.includes(sexo.toUpperCase())) {
    throw new Error("Sexo deve ser Masculino ou Feminino.");
  }

};

//validar data de nascimento
export const validarDataNascimento = (data) => {

  const dataConvertida =
    new Date(data);

  if (isNaN(dataConvertida.getTime())) {
    throw new Error("Data de nascimento inválida.");
  }

  const hoje = new Date();

  if (dataConvertida > hoje) {
    throw new Error("Data de nascimento não pode ser futura.");
  }

};

//validar o endereço
export const validarEndereco = (endereco) => {

  if (!endereco) {
    throw new Error("Endereço é obrigatório.");
  }

  const { cep, logradouro, numero, bairro, cidade, uf } = endereco;

  if (!cep || !logradouro || !numero || !bairro || !cidade || !uf) {
    throw new Error("Todos os campos do endereço devem ser preenchidos.");
  }

};