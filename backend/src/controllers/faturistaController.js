import authService from '../services/authService.js';

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
