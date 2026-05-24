import { criarFaturista } from '../services/faturistaService.js';

export async function criarFaturistaController(req, res) {
  try {
    // Chama o service enviando os dados limpos que vieram do req.body
    const novoFaturista = await criarFaturista(req.body);

    // Se deu certo, retorna HTTP 201 (Created)
    return res.status(201).json({
      status: "success",
      message: "Faturista cadastrado com sucesso e pronto para gerar o BPA!",
      data: novoFaturista
    });

  } catch (error) {
    // CORREÇÃO: Printa o erro real no terminal do VS Code para não ficarmos no escuro
    console.error("?? ERRO DETECTADO NO CONTROLLER:", error);

    // CORREÇÃO: Garante que a mensagem será lida, mesmo que o erro não tenha o atributo .message
    return res.status(400).json({
      status: "error",
      message: error.message || error || "Erro interno ao processar a criação do faturista."
    });
  }
}