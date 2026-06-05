import React, { useState, useEffect } from 'react';
import { calcularIdade } from '../pacientesMappers.js';

export function PacienteModal({ aberto, fechar, paciente, aoSalvar, valoresIniciais }) {
  const [values, setValues] = useState(valoresIniciais);
  

  const [erros, setErros] = useState({});

  useEffect(() => {
    if (paciente) {
      setValues(paciente);
    } else {
      setValues(valoresIniciais);
    }

    setErros({});
  }, [paciente, aberto, valoresIniciais]);


  useEffect(() => {
    if (values.dataNascimento) {
      const idadeCalculada = calcularIdade(values.dataNascimento);
      setValues(prev => ({ ...prev, idade: idadeCalculada }));
    }
  }, [values.dataNascimento]);

  if (!aberto) return null;

  const handleChange = (campo, valor) => {
    setValues(prev => ({ ...prev, [campo]: valor }));
    

    if (erros[campo]) {
      setErros(prev => {
        const novosErros = { ...prev };
        delete novosErros[campo];
        return novosErros;
      });
    }
  };


  const validarFormulario = () => {
    const novosErros = {};
    
    // Lista de campos obrigatórios
    const camposObrigatorios = {
      nomeCompleto: 'O nome completo é obrigatório',
      dataNascimento: 'A data de nascimento é obrigatória',
      sexo: 'O sexo é obrigatório',
      racaCor: 'A raça/cor é obrigatória',
      nacionalidade: 'A nacionalidade é obrigatória',
      cns: 'O cartão CNS é obrigatório',
      cep: 'O CEP é obrigatório',
      logradouro: 'O logradouro é obrigatório',
      numero: 'O número é obrigatório',
      bairro: 'O bairro é obrigatório'
    };

    Object.keys(camposObrigatorios).forEach(campo => {
      if (!values[campo] || String(values[campo]).trim() === '') {
        novosErros[campo] = camposObrigatorios[campo];
      }
    });

    setErros(novosErros);
    
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      aoSalvar(values);
    }
  };

  return (
    <div className="paciente-modal-overlay">
      <div className="paciente-modal-box">
        <div className="paciente-modal-header">
          <h2>{paciente ? 'Editar Paciente' : 'Novo Paciente'}</h2>
          <button type="button" className="paciente-modal-close" onClick={fechar}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="paciente-modal-form" noValidate>
          
          <div className="form-row full">
            <label>Nome Completo *</label>
            <input 
              type="text" 
              value={values.nomeCompleto || ''} 
              onChange={e => handleChange('nomeCompleto', e.target.value)} 
              aria-invalid={erros.nomeCompleto ? "true" : "false"}
            />
            {erros.nomeCompleto && <span className="field-error">{erros.nomeCompleto}</span>}
          </div>

          <div className="form-grid-3">
            <div>
              <label>Data de Nascimento *</label>
              <input 
                type="date" 
                value={values.dataNascimento || ''} 
                onChange={e => handleChange('dataNascimento', e.target.value)} 
                aria-invalid={erros.dataNascimento ? "true" : "false"}
              />
              {erros.dataNascimento && <span className="field-error">{erros.dataNascimento}</span>}
            </div>
            <div>
              <label>Idade</label>
              <input type="text" disabled value={values.idade || ''} className="input-disabled" />
            </div>
            <div>
              <label>Sexo *</label>
              <select value={values.sexo || ''} onChange={e => handleChange('sexo', e.target.value)} aria-invalid={erros.sexo ? "true" : "false"}>
                <option value="">Selecione</option>
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
              </select>
              {erros.sexo && <span className="field-error">{erros.sexo}</span>}
            </div>
          </div>

          <div className="form-grid-2">
            <div>
              <label>Raça/Cor *</label>
              <select value={values.racaCor || ''} onChange={e => handleChange('racaCor', e.target.value)} aria-invalid={erros.racaCor ? "true" : "false"}>
                <option value="">Selecione</option>
                <option value="Branco(a)">Branco(a)</option>
                <option value="Preto(a)">Preto(a)</option>
                <option value="Pardo(a)">Pardo(a)</option>
                <option value="Amarelo(a)">Amarelo(a)</option>
                <option value="Indígena">Indígena</option>
                <option value="Sem informação">Sem informação</option>
              </select>
              {erros.racaCor && <span className="field-error">{erros.racaCor}</span>}
            </div>
            <div>
              <label>Nacionalidade *</label>
              <select value={values.nacionalidade || ''} onChange={e => handleChange('nacionalidade', e.target.value)} aria-invalid={erros.nacionalidade ? "true" : "false"}>
                <option value="">Selecione</option>
                <option value="Brasileiro(a)">Brasileiro(a)</option>
                <option value="Estrangeiro(a)">Estrangeiro(a)</option>
                <option value="Naturalizado(a)">Naturalizado(a)</option>
              </select>
              {erros.nacionalidade && <span className="field-error">{erros.nacionalidade}</span>}
            </div>
          </div>

          <div className="form-grid-2">
            <div>
              <label>CNS (Cartão Nacional de Saúde) *</label>
              <input 
                type="text" 
                maxLength="15" 
                placeholder="000000000000000" 
                value={values.cns || ''} 
                onChange={e => handleChange('cns', e.target.value)} 
                aria-invalid={erros.cns ? "true" : "false"}
              />
              {erros.cns && <span className="field-error">{erros.cns}</span>}
            </div>
            <div>
              <label>CPF</label>
              <input 
                type="text" 
                maxLength="14" 
                placeholder="000.000.000-00" 
                value={values.cpf || ''} 
                onChange={e => handleChange('cpf', e.target.value)} 
              />
            </div>
          </div>

          <h3 className="section-title">Endereço</h3>
          <hr />

          <div className="form-grid-2 font-end">
            <div>
              <label>CEP *</label>
              <input 
                type="text" 
                maxLength="8" 
                placeholder="00000000" 
                value={values.cep || ''} 
                onChange={e => handleChange('cep', e.target.value)} 
                aria-invalid={erros.cep ? "true" : "false"}
              />
              {erros.cep && <span className="field-error">{erros.cep}</span>}
            </div>
            <div>
              <label>Logradouro *</label>
              <input 
                type="text" 
                value={values.logradouro || ''} 
                onChange={e => handleChange('logradouro', e.target.value)} 
                aria-invalid={erros.logradouro ? "true" : "false"}
              />
              {erros.logradouro && <span className="field-error">{erros.logradouro}</span>}
            </div>
          </div>

          <div className="form-grid-3">
            <div>
              <label>Número *</label>
              <input 
                type="text" 
                value={values.numero || ''} 
                onChange={e => handleChange('numero', e.target.value)} 
                aria-invalid={erros.numero ? "true" : "false"}
              />
              {erros.numero && <span className="field-error">{erros.numero}</span>}
            </div>
            <div>
              <label>Bairro *</label>
              <input 
                type="text" 
                value={values.bairro || ''} 
                onChange={e => handleChange('bairro', e.target.value)} 
                aria-invalid={erros.bairro ? "true" : "false"}
              />
              {erros.bairro && <span className="field-error">{erros.bairro}</span>}
            </div>
            <div>
              <label>Complemento</label>
              <input 
                type="text" 
                value={values.complemento || ''} 
                onChange={e => handleChange('complemento', e.target.value)} 
              />
            </div>
          </div>

          <div className="paciente-modal-footer">
            <button type="button" className="btn-cancelar" onClick={fechar}>Cancel</button>
            <button type="submit" className="btn-salvar">
              {paciente ? 'Salvar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}