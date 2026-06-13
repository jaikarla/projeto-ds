import { useState, useEffect } from 'react';
import { perfilService } from './perfilService';
import { perfilMappers } from './perfilMappers';

export function usePerfil(onLogoutSuccess) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cargo: '',
    cpf: '',
    registro: '',
    uf: 'PE'
  });
  
  const [dadosOriginais, setDadosOriginais] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errors, setErrors] = useState({});

  // Carrega os dados iniciais do banco através do Service e do Mapper
  useEffect(() => {
    async function carregarDados() {
      try {
        const dadosApi = await perfilService.getPerfil();
        const dadosFormatados = perfilMappers.toState(dadosApi);
        setFormData(dadosFormatados);
        setDadosOriginais(dadosFormatados);
      } catch (err) {
        console.error("Erro ao carregar dados do perfil", err);
      }
    }
    carregarDados();
  }, []);

  const handleChange = (field, value) => {
    if (field === 'cpf') {
      // Aplica máscara de CPF dinamicamente
      let masked = value.replace(/\D/g, '');
      if (masked.length <= 11) {
        masked = masked.replace(/(\d{3})(\d)/, '$1.$2');
        masked = masked.replace(/(\d{3})(\d)/, '$1.$2');
        masked = masked.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        value = masked;
      } else return;
    }

    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validarFormulario = () => {
    const novosErros = {};
    if (!formData.nome.trim()) novosErros.nome = 'O nome completo é obrigatório.';
    if (!formData.email.trim() || !formData.email.includes('@')) novosErros.email = 'Insira um e-mail válido.';
    if (formData.cpf.replace(/\D/g, '').length !== 11) novosErros.cpf = 'O CPF deve conter 11 dígitos.';
    if (!formData.registro.trim()) novosErros.registro = 'O registro profissional é obrigatório.';

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleEditar = () => {
    setDadosOriginais(formData);
    setIsEditing(true);
  };

  const handleCancelar = () => {
    setFormData(dadosOriginais);
    setErrors({});
    setIsEditing(false);
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      const payload = perfilMappers.toApi(formData);
      await perfilService.updatePerfil(payload);
      
      setIsEditing(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Erro ao salvar alterações do perfil", err);
    }
  };

  const handleConfirmarExclusao = async () => {
    try {
      await perfilService.deleteAccount();
      setShowDeleteModal(false);
      if (onLogoutSuccess) onLogoutSuccess();
    } catch (err) {
      console.error("Erro ao deletar conta", err);
    }
  };

  return {
    formData,
    isEditing,
    showToast,
    showDeleteModal,
    errors,
    setShowDeleteModal,
    handleChange,
    handleEditar,
    handleCancelar,
    handleSalvar,
    handleConfirmarExclusao
  };
}