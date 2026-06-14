import { onlyDigits } from './professionalMappers'

export function validateProfessionalForm(form) {
  const errors = {}

  const cpf = onlyDigits(form.cpf || '')
  const cns = onlyDigits(form.cns || '')

  if (!form.nome || !form.nome.trim()) {
    errors.nome = 'Nome é obrigatório'
  }


  if (cpf.length !== 11) {
    errors.cpf = 'CPF inválido (deve conter 11 dígitos)'
  }

  if (cns.length !== 15) {
    errors.cns = 'CNS é obrigatório e deve conter 15 dígitos'
  }

  if (form.tipo === 'estudante') {
    if (!form.matricula || !form.matricula.trim()) {
      errors.matricula = 'Matrícula é obrigatória para estudantes'
    }
  } else {
    
    const registroDigits = onlyDigits(form.registro || '')
    
    if (registroDigits.length < 4 || registroDigits.length > 10) {
      errors.registro = 'Registro profissional inválido (4-10 dígitos)'
    }

    if (!form.uf) {
      errors.uf = 'UF do conselho é obrigatória'
    }

    if (!form.cbo || !form.cbo.trim()) {
      errors.cbo = 'CBO é obrigatório'
    }
  }

  return errors
}
