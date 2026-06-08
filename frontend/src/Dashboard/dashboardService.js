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
  try {
    const params = new URLSearchParams()

    if (filters.dataInicio && filters.dataFim) {
      params.set('dataInicio', filters.dataInicio)
      params.set('dataFim', filters.dataFim)
    }

    const url = params.toString() ? `${API_URL}?${params.toString()}` : API_URL
    const response = await fetch(url)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const mensagem = errorData.mensagem || errorData.erro || 'Erro ao carregar os dados do dashboard.'
      throw new Error(mensagem)
    }
    
    const payload = await response.json()
    return normalizeDashboard(payload)
  } catch (error) {
    console.error('Erro ao buscar resumo do dashboard:', error)
    throw new Error(error.message || 'Erro ao carregar os dados do dashboard.')
  }
}

export async function fetchDashboardEstatisticas(dataInicio, dataFim) {
  try {
    const params = new URLSearchParams()
    params.set('dataInicio', dataInicio)
    params.set('dataFim', dataFim)

    const url = `${API_URL}/estatisticas?${params.toString()}`
    const response = await fetch(url)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const mensagem = errorData.mensagem || errorData.erro || 'Erro ao carregar as estatísticas.'
      throw new Error(mensagem)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar estatísticas do dashboard:', error)
    throw new Error(error.message || 'Erro ao carregar as estatísticas.')
  }
}

export { emptyDashboard }
