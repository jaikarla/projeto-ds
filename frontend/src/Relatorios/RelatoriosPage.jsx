import React from 'react';
import { FileText, Download } from 'lucide-react';
import { useRelatorios } from './useRelatorios';
import BpaCHeaderForm from "./components/BpaCHeaderForm.jsx";
import BpaIHeaderForm from "./components/BpaIHeaderForm.jsx";
import GeralHeaderForm from "./components/GeralHeaderForm.jsx";
import './Relatorios.css';

export default function RelatoriosPage() {
  const {
    dataInicial,
    setDataInicial,
    dataFinal,
    setDataFinal,
    activeTab,
    setActiveTab,
    contadores,
    cabecalhos,
    handleInputChange,
    handleExport,
    exporting,
  } = useRelatorios();

  return (
    <div className="relatorios-page-container">
      <div className="relatorios-header-title">
        <h1>Relatórios BPA</h1>
        <p>Gere relatórios de produção ambulatorial</p>
      </div>

      {/* CARD DO PERÍODO */}
      <div className="relatorios-card-base">
        <div className="card-section-title">
          <FileText size={18} className="text-blue-bpa" />
          <span>Período</span>
        </div>
        
        <div className="relatorios-date-row">
          <div className="relatorios-input-group">
            <label>Data Inicial</label>
            <input type="date" value={dataInicial} onChange={(e) => setDataInicial(e.target.value)} />
          </div>
          <div className="relatorios-input-group">
            <label>Data Final</label>
            <input type="date" value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} />
          </div>
        </div>
      </div>

      {/* SQUARES CONTADORES */}
      <div className="relatorios-counters-grid">
        <div className="counter-square-card">
          <span className="counter-label">Total Atendimentos</span>
          <span className="counter-value">{contadores.total}</span>
        </div>
        <div className="counter-square-card">
          <span className="counter-label">BPA-C (Consolidado)</span>
          <span className="counter-value">{contadores.bpaC}</span>
        </div>
        <div className="counter-square-card">
          <span className="counter-label">BPA-I (Individualizado)</span>
          <span className="counter-value">{contadores.bpaI}</span>
        </div>
      </div>

      {/* ABAS */}
      <div className="relatorios-tabs-navigation">
        <button className={`tab-nav-btn ${activeTab === 'BPA-C' ? 'active' : ''}`} onClick={() => setActiveTab('BPA-C')}>BPA-C</button>
        <button className={`tab-nav-btn ${activeTab === 'BPA-I' ? 'active' : ''}`} onClick={() => setActiveTab('BPA-I')}>BPA-I</button>
        <button className={`tab-nav-btn ${activeTab === 'Geral' ? 'active' : ''}`} onClick={() => setActiveTab('Geral')}>Relatório Geral</button>
      </div>

      {/* CARD DINÂMICO */}
      <div className="relatorios-card-base content-tab-card">
        <div className="card-section-sub">
          <span>Cabeçalho {activeTab === 'Geral' ? 'Relatório Geral' : activeTab} (opcional)</span>
        </div>

        {activeTab === 'BPA-C' && <BpaCHeaderForm values={cabecalhos} onChange={handleInputChange} />}
        {activeTab === 'BPA-I' && <BpaIHeaderForm values={cabecalhos} onChange={handleInputChange} />}
        {activeTab === 'Geral' && <GeralHeaderForm values={cabecalhos} onChange={handleInputChange} />}
      </div>

      {/* BOTÕES EXPORTAR */}
      <div className="relatorios-export-actions">
        <button className="btn-export csv" disabled={exporting} onClick={() => handleExport('csv')}>
          <Download size={16} />
          <span>{exporting ? 'Aguarde...' : 'CSV'}</span>
        </button>
        <button className="btn-export txt" disabled={exporting} onClick={() => handleExport('txt')}>
          <Download size={16} />
          <span>{exporting ? 'Aguarde...' : 'TXT'}</span>
        </button>
      </div>

      {/* FOOTER - NENHUM PROCEDIMENTO */}
      <div className="relatorios-empty-state-box">
        <p>Nenhum procedimento {activeTab === 'Geral' ? '' : activeTab} no período.</p>
      </div>
    </div>
  );
}