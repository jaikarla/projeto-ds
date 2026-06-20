import { useState, useEffect, useCallback } from 'react';
import { fetchPacientesApi, cadastrarPacienteApi, atualizarPacienteApi, deletarPacienteApi } from './pacientesService.js';
import { prepararPacienteParaEnvio, transformarPacienteDoBackend } from './pacientesMappers.js';

const initialFormValues = {
  nomeCompleto: '',
  dataNascimento: '',
  idade: '',
  sexo: '',
  racaCor: '',
  etnia: '',
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

  const mostrarFeedback = useCallback((tipo, mensagem) => {
    setAlert({ tipo, mensagem });
    setTimeout(() => setAlert(null), 4000);
  }, []);

  const carregarPacientes = useCallback(async (termoBusca = '') => {
    try {
      setLoading(true);
      const dados = await fetchPacientesApi(termoBusca);
      const pacientesTransformados = Array.isArray(dados)
        ? dados.map(transformarPacienteDoBackend)
        : [];

      setPacientes(pacientesTransformados);
    } catch (err) {
      mostrarFeedback('error', 'Não foi possível carregar a lista de pacientes.');
      console.error('Erro ao carregar pacientes:', err);
    } finally {
      setLoading(false);
    }
  }, [mostrarFeedback]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      carregarPacientes(busca);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [busca, carregarPacientes]);

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
    if (!window.confirm('Tem certeza de que deseja excluir este paciente?')) {
      return;
    }

    try {
      await deletarPacienteApi(id);
      mostrarFeedback('success', 'Paciente removido com sucesso!');
      carregarPacientes(busca);
    } catch (err) {
      console.error('Erro ao deletar paciente:', err);
      mostrarFeedback('error', 'Falha ao deletar paciente.');
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