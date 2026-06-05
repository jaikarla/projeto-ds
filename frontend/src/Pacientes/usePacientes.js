import { useState, useEffect } from 'react';
import { fetchPacientesApi, cadastrarPacienteApi, atualizarPacienteApi, deletarPacienteApi } from './pacientesService.js';
import { prepararPacienteParaEnvio } from './pacientesMappers.js';

const initialFormValues = {
  nomeCompleto: '',
  dataNascimento: '',
  idade: '',
  sexo: '',
  racaCor: '',
  etnia: '', // Adicionado
  nacionalidade: '',
  cns: '',
  cpf: '',
  cep: '',
  logradouro: '',
  numero: '',
  bairro: '',
  cidade: '', 
  uf: '' 
};

export function usePacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const [alert, setAlert] = useState(null);

  const carregarPacientes = async (termoBusca = '') => {
    try {
      setLoading(true);
      const dados = await fetchPacientesApi(termoBusca);
      setPacientes(dados);
    } catch (err) {
      mostrarFeedback('error', 'Não foi possível carregar a lista de pacientes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      carregarPacientes(busca);
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [busca]);

  const mostrarFeedback = (tipo, mensagem) => {
    setAlert({ tipo, mensagem });
    setTimeout(() => setAlert(null), 4000); // Some após 4 segundos
  };

  const abrirModalNovo = () => {
    setPacienteSelecionado(null);
    setModalAberto(true);
  };

  const abrirModalEdicao = (paciente) => {
    setPacienteSelecionado(paciente);
    setModalAberto(true);
  };

  const salvarPaciente = async (formValues) => {
    try {
      const dadosTratados = prepararPacienteParaEnvio(formValues);
      
      if (pacienteSelecionado?.id) {
        await atualizarPacienteApi(pacienteSelecionado.id, dadosTratados);
        mostrarFeedback('success', 'Paciente atualizado com sucesso!');
      } else {
        await cadastrarPacienteApi(dadosTratados);
        mostrarFeedback('success', 'Paciente cadastrado com sucesso!');
      }
      
      setModalAberto(false);
      carregarPacientes(busca);
    } catch (err) {
      mostrarFeedback('error', err.message || 'Erro ao salvar os dados do paciente.');
    }
  };

  const deletarPaciente = async (id) => {
    if (window.confirm('Tem certeza de que deseja excluir este paciente?')) {
      try {
        await deletarPacienteApi(id);
        mostrarFeedback('success', 'Paciente removido com sucesso!');
        carregarPacientes(busca);
      } catch (err) {
        mostrarFeedback('error', 'Falha ao deletar paciente.');
      }
    }
  };

  return {
    pacientes,
    busca,
    setBusca,
    modalAberto,
    setModalAberto,
    pacienteSelecionado,
    loading,
    alert,
    initialFormValues,
    abrirModalNovo,
    abrirModalEdicao,
    salvarPaciente,
    deletarPaciente
  };
}