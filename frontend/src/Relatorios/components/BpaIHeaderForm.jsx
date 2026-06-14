import React from 'react';

export default function BpaIHeaderForm({ values, onChange }) {
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
        <label>CNS do Profissional</label>
        <input 
          type="text" 
          value={values.cnsProfissional || ''} 
          onChange={(e) => onChange('cnsProfissional', e.target.value)} 
        />
      </div>
      <div className="relatorios-input-group">
        <label>CBO</label>
        <input 
          type="text" 
          value={values.cbo || ''} 
          onChange={(e) => onChange('cbo', e.target.value)} 
        />
      </div>
      <div className="relatorios-input-group">
        <label>Equipe</label>
        <input 
          type="text" 
          value={values.equipe || ''} 
          onChange={(e) => onChange('equipe', e.target.value)} 
        />
      </div>
    </div>
  );
}