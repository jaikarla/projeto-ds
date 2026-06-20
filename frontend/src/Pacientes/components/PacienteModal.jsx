import { useState, useEffect, useRef } from 'react';
import { calcularIdade } from '../pacientesMappers.js';

export function PacienteModal({ aberto, fechar, paciente, aoSalvar, valoresIniciais }) {
  const [values, setValues] = useState(valoresIniciais);
  const [erros, setErros] = useState({});
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const dropdownRef = useRef(null);

  const ufs = [
    "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", 
    "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"
  ];

  useEffect(() => {
    if (paciente) {
      // Isola o YYYY-MM-DD para o <input type="date"> aceitar perfeitamente na edição
      const dataFormatada = paciente.dataNascimento 
        ? paciente.dataNascimento.split('T')[0] 
        : '';

      setValues({
        ...paciente,
        dataNascimento: dataFormatada
      });
    } else {
      setValues(valoresIniciais);
    }
    setErros({});
    setDropdownAberto(false);
  }, [paciente, aberto, valoresIniciais]);

  // Fecha o dropdown de UF se clicar fora dele
  useEffect(() => {
    function clicarFora(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownAberto(false);
      }
    }
    document.addEventListener("mousedown", clicarFora);
    return () => document.removeEventListener("mousedown", clicarFora);
  }, []);

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
    
    const camposObrigatorios = {
      nomeCompleto: 'O nome completo é obrigatório',
      dataNascimento: 'A data de nascimento é obrigatória',
      sexo: 'O sexo é obrigatório',
      racaCor: 'A raça/cor é obrigatória',
      etnia: 'A etnia é obrigatória',
      cpf: 'O CPF é obrigatório',
      nacionalidade: 'A nacionalidade é obrigatória',
      cns: 'O cartão CNS é obrigatório',
      cep: 'O CEP é obrigatório',
      logradouro: 'O logradouro é obrigatório',
      numero: 'O número é obrigatório',
      bairro: 'O bairro é obrigatório',
      cidade: 'A cidade é obrigatória',
      uf: 'O estado (UF) é obrigatório'
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
              <input
                type="text"
                disabled
                value={values.dataNascimento ? calcularIdade(values.dataNascimento) : ''}
                className="input-disabled"
              />
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

          <div className="form-grid-3">
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
              <label>Etnia *</label>
              <input 
                type="text" 
                placeholder="Digite a etnia" 
                value={values.etnia || ''} 
                onChange={e => handleChange('etnia', e.target.value)} 
                aria-invalid={erros.etnia ? "true" : "false"}
              />
              {erros.etnia && <span className="field-error">{erros.etnia}</span>}
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
              <label>CPF *</label>
              <input 
                type="text" 
                maxLength="14" 
                placeholder="000.000.000-00" 
                value={values.cpf || ''} 
                onChange={e => handleChange('cpf', e.target.value)} 
                aria-invalid={erros.cpf ? "true" : "false"}
              />
              {erros.cpf && <span className="field-error">{erros.cpf}</span>}
            </div>
          </div>

        
          <div className="form-section-divisor">
            <hr className="section-hr" />
            <h3 className="section-title">Endereço</h3>
          </div>

          <div className="form-grid-2">
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

          <div className="form-grid-4">
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
              <label>Cidade *</label>
              <input 
                type="text" 
                placeholder="Cidade"
                value={values.cidade || ''} 
                onChange={e => handleChange('cidade', e.target.value)} 
                aria-invalid={erros.cidade ? "true" : "false"}
              />
              {erros.cidade && <span className="field-error">{erros.cidade}</span>}
            </div>
            
            <div ref={dropdownRef} className="custom-uf-wrapper">
              <label>UF *</label>
              <div 
                className={`custom-uf-select ${dropdownAberto ? 'ativo' : ''}`}
                onClick={() => setDropdownAberto(!dropdownAberto)}
                aria-invalid={erros.uf ? "true" : "false"}
              >
                {values.uf || '--'}
              </div>
              
              {dropdownAberto && (
                <div className="custom-uf-options">
                  <div className="custom-uf-option" onClick={() => { handleChange('uf', ''); setDropdownAberto(false); }}>--</div>
                  {ufs.map(uf => (
                    <div 
                      key={uf} 
                      className={`custom-uf-option ${values.uf === uf ? 'selecionado' : ''}`}
                      onClick={() => {
                        handleChange('uf', uf);
                        setDropdownAberto(false);
                      }}
                    >
                      {uf}
                    </div>
                  ))}
                </div>
              )}
              {erros.uf && <span className="field-error">{erros.uf}</span>}
            </div>
          </div>

          <div className="paciente-modal-footer">
            <button type="button" className="btn-cancelar" onClick={fechar}>Cancelar</button>
            <button type="submit" className="btn-salvar">
              {paciente ? 'Salvar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
