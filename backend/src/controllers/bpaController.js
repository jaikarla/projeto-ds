import {
  buscarContadores,
  buscarDadosRelatorio,
  gerarCSV,
  gerarTXT
} from '../services/bpaService.js'


//controllers para o BPA
export const getBpas = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Listando BPAs",
    data: []
  });
};

//para buscar um BPA específico, usando o ID passado na URL
export const getBpaById = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Buscando BPA ${req.params.id}`
  });
};

//para criar um novo BPA, usando os dados enviados no corpo da requisição
export const createBpa = (req, res) => {
  res.status(201).json({
    success: true,
    message: "BPA criado com sucesso",
    data: req.body
  });
};

//para apagar um BPA específico, usando o ID passado na URL
export const deleteBpa = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    success: true,
    message: `BPA com ID ${id} removido com sucesso`
  });
};

//regras de negócio
//responsável por realizar o cálculo do BPA, gerar relatórios, exportar dados, etc.
export const calcularBpa = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Cálculo do BPA realizado"
  });
};
// retorna contadores do período para exibir na tela
export const getContadores = async (req, res) => {
  try {
    const { dataInicial, dataFinal } = req.query

    if (!dataInicial || !dataFinal) {
      return res.status(400).json({
        success: false,
        message: 'Data inicial e data final são obrigatórias.'
      })
    }

    const contadores = await buscarContadores(dataInicial, dataFinal)
    res.status(200).json(contadores)

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// exporta o relatório em CSV ou TXT - RN8
export const exportarRelatorio = async (req, res) => {
  try {
    const { tipo, formato } = req.params;
    const {
      dataInicial, dataFinal,
      cnes, nomeEstabelecimento, uf, mesAno,
      cnsProfissional, cbo, equipe
    } = req.query;

    if (!dataInicial || !dataFinal) {
      return res.status(400).json({
        success: false,
        message: 'Data inicial e data final são obrigatórias.'
      });
    }

    const dados = await buscarDadosRelatorio(dataInicial, dataFinal, tipo);

    // CENÁRIO DE FALHA: sem dados no período não gera arquivo
    if (dados.bpaC.length === 0 && dados.bpaI.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Não existem dados para o período selecionado.'
      });
    }

    const cabecalho = { cnes, nomeEstabelecimento, uf, mesAno, cnsProfissional, cbo, equipe };

    if (formato === 'csv') {
      const conteudo = gerarCSV(dados, cabecalho);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename=BPA_${tipo}_${dataInicial}_${dataFinal}.csv`);
      return res.send(conteudo);
    }

    if (formato === 'txt') {
      const conteudo = gerarTXT(dados, cabecalho, dataInicial, dataFinal);
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename=BPA_${tipo}_${dataInicial}_${dataFinal}.txt`);
      return res.send(conteudo);
    }

    res.status(400).json({ success: false, message: 'Formato inválido. Use csv ou txt.' });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}