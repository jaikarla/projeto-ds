const API_URL = '/api/dashboard'

const emptyDashboard = {
  periodo: { dataInicio: null, dataFim: null },
  cadastros: {
    profissionais: 0,
    estudantes: 0,
  },
  producao: {
    totalAtendimentos: 0,
    totalProcedimentosDisponiveis: 0,
  },
  atendimentosPorTipo: {
    bpaI: 0,
    bpaC: 0,
  },
  ultimosAtendimentos: [],
}

function toNumber(value) {
  const parsedValue = Number(value)
  return Number.isFinite(parsedValue) ? parsedValue : 0
}

function normalizeDashboard(payload = {}) {
  return {
    periodo: {
      dataInicio: payload.periodo?.dataInicio ?? null,
      dataFim: payload.periodo?.dataFim ?? null,
    },
    cadastros: {
      profissionais: toNumber(payload.cadastros?.profissionais),
      estudantes: toNumber(payload.cadastros?.estudantes),
    },
    producao: {
      totalAtendimentos: toNumber(payload.producao?.totalAtendimentos),
      totalProcedimentosDisponiveis: toNumber(payload.producao?.totalProcedimentosDisponiveis),
    },
    atendimentosPorTipo: {
      bpaI: toNumber(payload.atendimentosPorTipo?.bpaI),
      bpaC: toNumber(payload.atendimentosPorTipo?.bpaC),
    },
    ultimosAtendimentos: Array.isArray(payload.ultimosAtendimentos)
      ? payload.ultimosAtendimentos
      : [],
  }
}

export async function fetchDashboardResumo(filters = {}) {
  const params = new URLSearchParams()

  if (filters.dataInicio && filters.dataFim) {
    params.set('dataInicio', filters.dataInicio)
    params.set('dataFim', filters.dataFim)
  }

  const url = params.toString() ? `${API_URL}?${params.toString()}` : API_URL
  const response = await fetch(url)
  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.mensagem || payload.erro || 'Erro ao carregar os dados do dashboard.')
  }

  return normalizeDashboard(payload)
}

export { emptyDashboard }
