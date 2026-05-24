//este arquivo é para add validações genéricas de profissionais/estudantes e pacientes
//isso evita que tenhamos Duplicação de código e facilita a manutenção

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

  const croRegex = /^[A-Z]{3}-\d{5}$/i;

  if (!croRegex.test(cro)) {
    throw new Error("CRO inválido. Use XXX-12345.");
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




