import { cadastrarFaturista } from '../services/faturistaService.js';

export async function criarFaturistaController(req, res) {
  try {
    // Chama o service enviando os dados limpos que vieram do req.body
    const novoFaturista = await cadastrarFaturista(req.body);

    // Se deu certo, retorna HTTP 201 (Created)
    return res.status(201).json({
      status: "success",
      message: "Faturista cadastrado com sucesso e pronto para gerar o BPA!",
      data: novoFaturista
    });

  } catch (error) {
    // Se o service estourou algum erro (ex: E-mail já em uso), cai aqui
    return res.status(400).json({
      status: "error",
      message: error.message
    });
  }
}