export function formToApiFiltros(dataInicial, dataFinal, activeTab, cabecalhos) {
  const filtrosBase = {
    dataInicial,
    dataFinal,
    cnes: cabecalhos.cnes?.trim() || null,
    nomeEstabelecimento: cabecalhos.nomeEstabelecimento?.trim() || null,
  };

  if (activeTab === 'BPA-C' || activeTab === 'Geral') {
    return {
      ...filtrosBase,
      uf: cabecalhos.uf?.trim() || null,
      mesAno: cabecalhos.mesAno?.trim() || null,
    };
  }

  if (activeTab === 'BPA-I') {
    return {
      ...filtrosBase,
      cnsProfissional: cabecalhos.cnsProfissional?.trim() || null,
      cbo: cabecalhos.cbo?.trim() || null,
      equipe: cabecalhos.equipe?.trim() || null,
    };
  }

  return filtrosBase;
}