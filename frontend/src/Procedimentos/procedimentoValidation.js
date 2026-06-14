import { PROCEDIMENTO_TIPOS } from './procedimentoConstants'
import { normalizeCodigo } from './procedimentoMappers'

export function validateProcedimentoForm(form, procedimentos, editingProcedimentoId = null) {
  const errors = {}
  const codigo = normalizeCodigo(form.codigo)

  if (!form.nome.trim()) {
    errors.nome = 'Nome é obrigatório.'
  }

  if (!codigo) {
    errors.codigo = 'Código é obrigatório.'
  } else if (codigo.length > 10) {
    errors.codigo = 'Código deve ter no maximo 10 digitos.'
  }

  if (!PROCEDIMENTO_TIPOS.includes(form.tipo)) {
    errors.tipo = 'Selecione BPA-C ou BPA-I.'
  }

  const codigoJaCadastrado = procedimentos.some((procedimento) => {
    return procedimento.codigo === codigo && procedimento.id !== editingProcedimentoId
  })

  if (codigo && codigoJaCadastrado) {
    errors.codigo = 'Já existe um procedimento cadastrado com este código.'
  }

  return errors
}
