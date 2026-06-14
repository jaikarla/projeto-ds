import authService from '../services/authService.js';
import {
  atualizarFaturista,
  atualizarSenhaFaturista,
  buscarFaturistaPorId,
  deletarFaturista
} from '../services/faturistaService.js';

export async function criarFaturistaController(req, res) {
  try {
    const resultado = await authService.register(req.body);

    return res.status(201).json({
      status: 'success',
      message: 'Faturista cadastrado com sucesso e pronto para gerar o BPA!',
      data: resultado
    });
  } catch (error) {
    console.error('Erro detectado no controller:', error);

    const statusCode = error.message === 'E-mail já cadastrado' || error.message === 'CPF já cadastrado' ? 409 : 400;

    return res.status(statusCode).json({
      status: 'error',
      message: error.message || 'Erro interno ao processar a criação do faturista.'
    });
  }
}

export async function buscarFaturistaController(req, res) {
  try {
    const faturista = await buscarFaturistaPorId(req.params.id);

    if (!faturista) {
      return res.status(404).json({ erro: 'Faturista não encontrado.' });
    }

    return res.status(200).json({ dados: faturista });
  } catch (error) {
    return res.status(500).json({ erro: error.message || 'Erro ao buscar faturista.' });
  }
}

export async function atualizarFaturistaController(req, res) {
  try {
    const { nome, email, cpf, telefone } = req.body;

    if (!nome || !email || !cpf || !telefone) {
      return res.status(400).json({ erro: 'Nome, e-mail, CPF e telefone são obrigatórios.' });
    }

    const faturista = await atualizarFaturista(req.params.id, {
      nome,
      email: String(email).trim().toLowerCase(),
      cpf: String(cpf).replace(/\D/g, ''),
      telefone: String(telefone).replace(/\D/g, '')
    });

    if (!faturista) {
      return res.status(404).json({ erro: 'Faturista não encontrado.' });
    }

    return res.status(200).json({ mensagem: 'Perfil atualizado com sucesso.', dados: faturista });
  } catch (error) {
    return res.status(400).json({ erro: error.message || 'Erro ao atualizar faturista.' });
  }
}

export async function atualizarSenhaFaturistaController(req, res) {
  try {
    await atualizarSenhaFaturista(req.params.id, req.body);

    return res.status(200).json({ mensagem: 'Senha atualizada com sucesso.' });
  } catch (error) {
    const statusCode = error.message === 'Faturista não encontrado' ? 404 : 400;
    return res.status(statusCode).json({ erro: error.message || 'Erro ao atualizar senha.' });
  }
}

export async function deletarFaturistaController(req, res) {
  try {
    const faturistaRemovido = await deletarFaturista(req.params.id);

    if (!faturistaRemovido) {
      return res.status(404).json({ erro: 'Faturista não encontrado.' });
    }

    return res.status(200).json({ mensagem: 'Conta excluída com sucesso.' });
  } catch (error) {
    return res.status(400).json({ erro: error.message || 'Erro ao excluir conta.' });
  }
}
