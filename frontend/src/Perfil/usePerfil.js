import { useState, useEffect } from 'react';
import { perfilService } from './perfilService';
import { perfilMappers } from './perfilMappers';

export function usePerfil(onLogoutSuccess) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    cep: '',
    numero: '',
    complemento: ''
  });
  
  const [dadosOriginais, setDadosOriginais] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function carregarDados() {
      try {
        const dadosApi = await perfilService.getPerfil();
        const dadosFormatados = perfilMappers.toState(dadosApi);
        
        // Aplica máscaras iniciais nos dados estáticos
        if (dadosFormatados.cpf) dadosFormatados.cpf = aplicarMascaraCPF(dadosFormatados.cpf);
        if (dadosFormatados.telefone) dadosFormatados.telefone = aplicarMascaraTelefone(dadosFormatados.telefone);
        if (dadosFormatados.cep) dadosFormatados.cep = aplicarMascaraCEP(dadosFormatados.cep);

        setFormData(dadosFormatados);
        setDadosOriginais(dadosFormatados);
      } catch (err) {
        console.error("Erro ao carregar dados do perfil", err);
      }
    }
    carregarDados();
  }, []);

  const aplicarMascaraCPF = (v) => {
    let masked = v.replace(/\D/g, '');
    masked = masked.replace(/(\d{3})(\d)/, '$1.$2');
    masked = masked.replace(/(\d{3})(\d)/, '$1.$2');
    masked = masked.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return masked;
  };

  const aplicarMascaraTelefone = (v) => {
    let masked = v.replace(/\D/g, '');
    masked = masked.replace(/^(\d{2})(\d)/g, '($1) $2');
    masked = masked.replace(/(\d{5})(\d)/, '$1-$2');
    return masked;
  };

  const aplicarMascaraCEP = (v) => {
    let masked = v.replace(/\D/g, '');
    masked = masked.replace(/^(\d{5})(\d)/, '$1-$2');
    return masked;
  };

  const handleChange = (field, value) => {
    if (field === 'cpf') {
      let digits = value.replace(/\D/g, '');
      if (digits.length <= 11) value = aplicarMascaraCPF(value);
      else return;
    }

    if (field === 'telefone') {
      let digits = value.replace(/\D/g, '');
      if (digits.length <= 11) value = aplicarMascaraTelefone(value);
      else return;
    }

    if (field === 'cep') {
      let digits = value.replace(/\D/g, '');
      if (digits.length <= 8) value = aplicarMascaraCEP(value);
      else return;
    }

    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validarFormulario = () => {
    const novosErros = {};
    if (!formData.nome || !formData.nome.trim()) novosErros.nome = 'O nome completo é obrigatório.';
    if (!formData.email || !formData.email.trim() || !formData.email.includes('@')) novosErros.email = 'Insira um e-mail válido.';
    
    const cpfLimpo = (formData.cpf || '').replace(/\D/g, '');
    if (cpfLimpo.length !== 11) novosErros.cpf = 'O CPF deve conter 11 dígitos.';
    
    const telLimpo = (formData.telefone || '').replace(/\D/g, '');
    if (telLimpo.length < 10 || telLimpo.length > 11) novosErros.telefone = 'Insira um telefone válido com DDD.';

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleEditar = () => {
    setDadosOriginais({ ...formData });
    setIsEditing(true);
  };

  const handleCancelar = () => {
    setFormData({ ...dadosOriginais });
    setErrors({});
    setIsEditing(false);
  };

  const handleSalvar = async (e) => {
    if (e) e.preventDefault();
    if (!validarFormulario()) return;

    try {
      const payload = perfilMappers.toApi(formData);
      await perfilService.updatePerfil(payload);
      
      setDadosOriginais({ ...formData });
      setIsEditing(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Erro ao salvar alterações do perfil", err);
    }
  };

  const handleConfirmarExclusao = async () => {
    try {
      await perfilService.deleteConta();
      setShowDeleteModal(false);
      if (onLogoutSuccess) onLogoutSuccess();
    } catch (err) {
      console.error("Erro ao deletar conta", err);
    }
  };

  const handleAlterarSenha = async (senhaData) => {
    try {
      await perfilService.updateSenha({
        senha_atual: senhaData.senhaAtual,
        nova_senha: senhaData.novaSenha
      });
      
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return true;
    } catch (err) {
      console.error("Erro ao alterar a senha:", err);
      return false;
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
    handleConfirmarExclusao,
    handleAlterarSenha
  };
}