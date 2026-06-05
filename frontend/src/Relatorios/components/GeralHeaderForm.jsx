import React from 'react';

export default function GeralHeaderForm({ values, onChange }) {
  return (
    <div className="dynamic-inputs-grid">
      <div className="relatorios-input-group">
        <label>CNES</label>
        <input 
          type="text" 
          placeholder="Código CNES" 
          value={values.cnes || ''} 
          onChange={(e) => onChange('cnes', e.target.value)} 
        />
      </div>
      <div className="relatorios-input-group">
        <label>Nome do Estabelecimento</label>
        <input 
          type="text" 
          value={values.nomeEstabelecimento || ''} 
          onChange={(e) => onChange('nomeEstabelecimento', e.target.value)} 
        />
      </div>
      <div className="relatorios-input-group">
        <label>UF</label>
        <input 
          type="text" 
          placeholder="Ex: SP" 
          value={values.uf || ''} 
          onChange={(e) => onChange('uf', e.target.value)} 
        />
      </div>
      <div className="relatorios-input-group">
        <label>Mês/Ano</label>
        <input 
          type="text" 
          placeholder="Ex: 04/2026" 
          value={values.mesAno || ''} 
          onChange={(e) => onChange('mesAno', e.target.value)} 
        />
      </div>
    </div>
  );
}