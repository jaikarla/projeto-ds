import { createElement, useEffect, useState } from 'react'
import {
  CalendarDays,
  ClipboardList,
  FileText,
  GraduationCap,
  RefreshCw,
  Search,
  Stethoscope,
  Users,
} from 'lucide-react'
import { emptyDashboard, fetchDashboardResumo } from './dashboardService'
import './Dashboard.css'

function formatDate(value) {
  if (!value) return 'Sem data'

  const [date] = String(value).split('T')
  const [year, month, day] = date.split('-')

  if (!year || !month || !day) return value

  return `${day}/${month}/${year}`
}

function getTodayInputValue() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function StatCard({ title, value, icon }) {
  return (
    <article className="dashboard-stat-card">
      <div>
        <span>{title}</span>
        <strong>{value}</strong>
      </div>
      {createElement(icon, { size: 22, strokeWidth: 1.9, 'aria-hidden': 'true' })}
    </article>
  )
}

function Dashboard() {
  const [today] = useState(getTodayInputValue)
  const [dashboard, setDashboard] = useState(emptyDashboard)
  const [filters, setFilters] = useState({ dataInicio: '', dataFim: '' })
  const [activePeriod, setActivePeriod] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldError, setFieldError] = useState('')

  async function loadDashboard(period = null) {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const data = await fetchDashboardResumo(period || {})
      setDashboard(data)
      setActivePeriod(period)
    } catch (error) {
      setErrorMessage(error.message)
      setDashboard(emptyDashboard)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true

    fetchDashboardResumo()
      .then((data) => {
        if (!isMounted) return
        setDashboard(data)
        setActivePeriod(null)
      })
      .catch((error) => {
        if (!isMounted) return
        setErrorMessage(error.message)
        setDashboard(emptyDashboard)
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleFilterChange = (event) => {
    const { name, value } = event.target
    setFilters((currentFilters) => ({ ...currentFilters, [name]: value }))
    setFieldError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!filters.dataInicio || !filters.dataFim) {
      setFieldError('Informe a data de inicio e a data de fim para filtrar.')
      return
    }

    if (filters.dataInicio > filters.dataFim) {
      setFieldError('A data de inicio nao pode ser maior que a data de fim.')
      return
    }

    loadDashboard(filters)
  }

  const handleClearFilters = () => {
    setFilters({ dataInicio: '', dataFim: '' })
    setFieldError('')
    loadDashboard()
  }

  const periodLabel = activePeriod
    ? `${formatDate(activePeriod.dataInicio)} a ${formatDate(activePeriod.dataFim)}`
    : 'Visao geral do sistema BPA'

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>{periodLabel}</p>
        </div>
      </div>

      <form className="dashboard-filter" onSubmit={handleSubmit}>
        <div className="dashboard-filter-title">
          <CalendarDays size={21} strokeWidth={1.9} aria-hidden="true" />
          <span>Filtrar por período</span>
        </div>

        <label>
          <span>Data de inicio</span>
          <input
            aria-invalid={fieldError ? 'true' : 'false'}
            max={today}
            name="dataInicio"
            type="date"
            value={filters.dataInicio}
            onChange={handleFilterChange}
          />
        </label>

        <label>
          <span>Data de fim</span>
          <input
            aria-invalid={fieldError ? 'true' : 'false'}
            max={today}
            name="dataFim"
            type="date"
            value={filters.dataFim}
            onChange={handleFilterChange}
          />
        </label>

        <div className="dashboard-filter-actions">
          <button className="dashboard-primary-button" type="submit" disabled={isLoading}>
            <Search size={18} strokeWidth={2} aria-hidden="true" />
            <span>Aplicar</span>
          </button>
          <button
            className="dashboard-secondary-button"
            type="button"
            onClick={handleClearFilters}
            disabled={isLoading && !activePeriod}
          >
            <RefreshCw size={18} strokeWidth={2} aria-hidden="true" />
            <span>Limpar</span>
          </button>
        </div>

        {fieldError && (
          <p className="dashboard-filter-error" role="alert">
            {fieldError}
          </p>
        )}
      </form>

      {errorMessage && (
        <p className="dashboard-feedback" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="dashboard-stats-grid" aria-busy={isLoading}>
        <StatCard
          icon={Users}
          title="Profissionais"
          value={dashboard.cadastros.profissionais}
        />
        <StatCard
          icon={GraduationCap}
          title="Estudantes"
          value={dashboard.cadastros.estudantes}
        />
        <StatCard
          icon={ClipboardList}
          title="Atendimentos"
          value={dashboard.producao.totalAtendimentos}
        />
        <StatCard
          icon={FileText}
          title="Procedimentos"
          value={dashboard.producao.totalProcedimentosDisponiveis}
        />
      </div>

      <div className="dashboard-panels">
        <section className="dashboard-panel dashboard-bpa-panel">
          <div className="dashboard-panel-header">
            <h2>Classificação BPA</h2>
            <Stethoscope size={21} strokeWidth={1.9} aria-hidden="true" />
          </div>

          <div className="dashboard-bpa-grid">
            <div>
              <span>BPA-C (Consolidado)</span>
              <strong>{dashboard.atendimentosPorTipo.bpaC}</strong>
            </div>
            <div>
              <span>BPA-I (Individualizado)</span>
              <strong>{dashboard.atendimentosPorTipo.bpaI}</strong>
            </div>
          </div>
        </section>

        <section className="dashboard-panel dashboard-last-panel">
          <div className="dashboard-panel-header">
            <h2>Últimos Atendimentos</h2>
            <ClipboardList size={21} strokeWidth={1.9} aria-hidden="true" />
          </div>

          {isLoading ? (
            <p className="dashboard-empty-state">Carregando dados do dashboard...</p>
          ) : dashboard.ultimosAtendimentos.length > 0 ? (
            <div className="dashboard-attendance-list">
              {dashboard.ultimosAtendimentos.map((atendimento) => (
                <article className="dashboard-attendance-item" key={atendimento.id}>
                  <div>
                    <strong>{atendimento.paciente_nome || 'Paciente nao identificado'}</strong>
                    <span>{atendimento.profissional_nome || 'Profissional nao informado'}</span>
                  </div>
                  <div>
                    <span>{formatDate(atendimento.data_atendimento)}</span>
                    <strong>{atendimento.tipos_procedimentos || 'Sem tipo'}</strong>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="dashboard-empty-state">Nenhum atendimento registrado.</p>
          )}
        </section>
      </div>
    </section>
  )
}

export default Dashboard
