import { onlyDigits } from './professionalMappers'

export function validateProfessionalForm(form) {
  const errors = {}
  const cpf = onlyDigits(form.cpf)
  const registroDigits = onlyDigits(form.registro)
  const cns = onlyDigits(form.cns)

  if (!form.nome.trim()) {
    errors.nome = 'Nome é obrigatório'
  }

  if (cpf.length !== 11) {
    errors.cpf = 'CPF inválido'
  }

  if (registroDigits.length < 4 || registroDigits.length > 10) {
    errors.registro = 'Registro profissional inválido (4-10 dígitos)'
  }

  if (!form.uf) {
    errors.uf = 'UF do conselho é obrigatória'
  }

  if (!form.cbo.trim()) {
    errors.cbo = 'CBO é obrigatório'
  }

  if (cns && cns.length !== 15) {
    errors.cns = 'CNS inválido'
  }

  return errors
}
