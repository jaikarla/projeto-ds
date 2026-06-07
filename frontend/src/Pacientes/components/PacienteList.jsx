import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export function PacientesList({ pacientes, aoEditar, aoDeletar }) {
  return (
    <div className="pacientes-table-wrapper">
      {!pacientes || pacientes.length === 0 ? (
        <p className="pacientes-empty-container">
          Nenhum paciente cadastrado ou encontrado.
        </p>
      ) : (
        <table className="pacientes-table">
          <thead>
            <tr className="table-header-row">
              <th>Nome</th>
              <th>Sexo</th>
              <th>Data Nasc.</th>
              <th>CNS</th>
              <th>Raça/Cor</th>
              <th style={{ textAlign: 'right', justifyContent: 'flex-end' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente) => (
              <tr key={paciente.id}>
                <td>{paciente.nomeCompleto}</td>
                <td>{paciente.sexo}</td>
                <td>
                  {paciente.dataNascimento ? (() => {
                    const apenasData = paciente.dataNascimento.split('T')[0];
                    const partes = apenasData.split('-');
                    
                    if (partes.length === 3) {
                      const [ano, mes, dia] = partes;
                      return `${dia}/${mes}/${ano}`;
                    }
                    return仅data; // fallback caso já esteja formatada
                  })() : ''}
                </td>
                <td>{paciente.cns}</td>
                <td>{paciente.racaCor}</td>
                <td>
                  <div className="table-actions">
                    <button 
                      type="button" 
                      className="btn-action-edit" 
                      onClick={() => aoEditar(paciente)}
                      title="Editar"
                    >
                      <Pencil size={20} />
                    </button>
                    <button 
                      type="button" 
                      className="btn-action-delete" 
                      onClick={() => aoDeletar(paciente.id)}
                      title="Excluir"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}