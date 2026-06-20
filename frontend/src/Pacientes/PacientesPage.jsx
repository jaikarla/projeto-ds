import React from 'react';
import { Search, Plus } from 'lucide-react';
import { usePacientes } from './usePacientes.js';
import { PacientesList } from './components/PacienteList.jsx';
import { PacienteModal } from './components/PacienteModal.jsx';
import './Pacientes.css';

export default function PacientesPage() {
  const {
    pacientes,
    busca,
    setBusca,
    modalAberto,
    pacienteSelecionado,
    loading,
    alert,
    initialFormValues,
    abrirModalNovo,
    abrirModalEdicao,
    salvarPaciente,
    deletarPaciente,
    setModalAberto
  } = usePacientes();

  return (
    <div className="pacientes-container">
      {/* Alertas de Feedback Visual */}
      {alert && (
        <div className={`paciente-alert ${alert.tipo}`}>
          <span>{alert.mensagem}</span>
        </div>
      )}

      <div className="pacientes-header">
        <div>
          <h1>Pacientes</h1>
          <p>Gerencie os pacientes cadastrados</p>
        </div>
        <button className="btn-novo-paciente" onClick={abrirModalNovo}>
          <span>+</span> Novo Paciente
        </button>
      </div>

      <div className="pacientes-search-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar por nome, CPF ou CNS..." 
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        </div>
      </div>

      <PacientesList 
        pacientes={pacientes}
        aoEditar={abrirModalEdicao}
        aoDeletar={deletarPaciente}
        loading={loading}
      />

      <PacienteModal 
        aberto={modalAberto}
        valoresIniciais={initialFormValues}
        paciente={pacienteSelecionado}
        fechar={() => setModalAberto(false)}
        aoSalvar={salvarPaciente}
      />
    </div>
  );
}