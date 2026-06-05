import { useState, useEffect } from 'react';
import { fetchRelatoriosContadores, downloadRelatorioApi } from "./relatoriosService.js";
import { formToApiFiltros } from "./relatoriosMappers.js";

export function useRelatorios() {
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [activeTab, setActiveTab] = useState('BPA-C');
  const [loadingContadores, setLoadingContadores] = useState(false);
  const [exporting, setExporting] = useState(false);
  
  const [contadores, setContadores] = useState({ total: 0, bpaC: 0, bpaI: 0 });

  const [cabecalhos, setCabecalhos] = useState({
    cnes: '',
    nomeEstabelecimento: '',
    uf: '',
    mesAno: '',
    cnsProfissional: '',
    cbo: '',
    equipe: '',
  });

  const handleInputChange = (field, value) => {
    setCabecalhos((prev) => ({ ...prev, [field]: value }));
  };

  // Toda vez que as datas mudarem, busca de forma reativa os contadores da API
  useEffect(() => {
    if (dataInicial && dataFinal) {
      setLoadingContadores(true);
      fetchRelatoriosContadores(dataInicial, dataFinal)
        .then(setContadores)
        .catch((err) => console.error(err.message))
        .finally(() => setLoadingContadores(false));
    }
  }, [dataInicial, dataFinal]);

  const handleExport = async (formato) => {
    if (!dataInicial || !dataFinal) {
      alert('Por favor, defina o período de Data Inicial e Data Final.');
      return;
    }

    try {
      setExporting(true);
      const filtrosFormatados = formToApiFiltros(dataInicial, dataFinal, activeTab, cabecalhos);
      
      // Mapeia o nome das abas para o padrão que a rota do back aceitar (bpa-c, bpa-i, geral)
      const tipoSlug = activeTab === 'Geral' ? 'geral' : activeTab.toLowerCase();
      
      const blob = await downloadRelatorioApi(tipoSlug, formato, filtrosFormatados);
      
      // Executa o download do buffer binário recebido do back
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `relatorio_${tipoSlug}_${Date.now()}.${formato}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      alert(`Falha na exportação: ${error.message}`);
    } finally {
      setExporting(false);
    }
  };

  return {
    dataInicial,
    setDataInicial,
    dataFinal,
    setDataFinal,
    activeTab,
    setActiveTab,
    contadores,
    cabecalhos,
    handleInputChange,
    handleExport,
    loadingContadores,
    exporting,
  };
}