import Atendimento from '../models/atendimento.js'

function formatarData(data) {
  if (!data) return ''
  const d = new Date(data)
  return d.toISOString().split('T')[0] 
}

// busca contadores do período para exibir na tela
export const buscarContadores = async (dataInicial, dataFinal) => {
  const [dadosBpaC, dadosBpaI] = await Promise.all([
    Atendimento.buscar_bpaC(dataInicial, dataFinal),
    Atendimento.buscar_bpaI(dataInicial, dataFinal)
  ])

  return {
    total: dadosBpaC.length + dadosBpaI.length,
    bpaC: dadosBpaC.length,
    bpaI: dadosBpaI.length
  }
}

// busca dados completos para gerar o arquivo
export const buscarDadosRelatorio = async (dataInicial, dataFinal, tipo) => {
  if (tipo === 'bpa-c') {
    const dados = await Atendimento.buscar_bpaC(dataInicial, dataFinal)
    return { bpaC: dados, bpaI: [] }
  }

  if (tipo === 'bpa-i') {
    const dados = await Atendimento.buscar_bpaI(dataInicial, dataFinal)
    return { bpaC: [], bpaI: dados }
  }

  // geral — busca os dois
  const [dadosBpaC, dadosBpaI] = await Promise.all([
    Atendimento.buscar_bpaC(dataInicial, dataFinal),
    Atendimento.buscar_bpaI(dataInicial, dataFinal)
  ])

  return { bpaC: dadosBpaC, bpaI: dadosBpaI }
}

// gera conteúdo CSV
export const gerarCSV = (dados, cabecalho) => {
  const linhas = []

  // cabeçalho do arquivo
  if (cabecalho.cnes || cabecalho.nomeEstabelecimento) {
    linhas.push(`CNES:${cabecalho.cnes || ''},ESTABELECIMENTO:${cabecalho.nomeEstabelecimento || ''},UF:${cabecalho.uf || ''},MES_ANO:${cabecalho.mesAno || ''}`)
    linhas.push('')
  }

  // BPA-C
  if (dados.bpaC.length > 0) {
    linhas.push('TIPO,CODIGO_PROCEDIMENTO,PROCEDIMENTO,CBO,QUANTIDADE')
    dados.bpaC.forEach(reg => {
      linhas.push(`BPA-C,${reg.codigo},${reg.procedimento_nome},${reg.cbo},${reg.quantidade_total}`)
    })
    linhas.push('')
  }

  // BPA-I
  if (dados.bpaI.length > 0) {
    linhas.push('TIPO,DATA,CODIGO_PROCEDIMENTO,PROCEDIMENTO,QUANTIDADE,CBO,PROFISSIONAL,CNS_PACIENTE,PACIENTE,NASCIMENTO,SEXO,RACA,CEP,LOGRADOURO,NUMERO,BAIRRO,CID')
    dados.bpaI.forEach(reg => {
      linhas.push([
        'BPA-I',
        formatarData(reg.data_atendimento),
        reg.procedimento_codigo,
        reg.procedimento_nome,
        reg.quantidade,
        reg.cbo,
        reg.profissional_nome,
        reg.cns,
        reg.paciente_nome,
        formatarData(reg.data_nascimento),
        reg.sexo,
        reg.raca,
        reg.cep || '',
        reg.logradouro || '',
        reg.numero || '',
        reg.bairro || '',
        reg.cid || ''
      ].join(','))
    })
  }

  return linhas.join('\n')
}

// gera conteúdo TXT
export const gerarTXT = (dados, cabecalho, dataInicial, dataFinal) => {
  const linhas = []
  const sep = '='.repeat(60)
  const sepMenor = '-'.repeat(60)

  linhas.push(sep)
  linhas.push('BOLETIM DE PRODUCAO AMBULATORIAL - BPA')
  linhas.push(`PERIODO: ${dataInicial} a ${dataFinal}`)
  if (cabecalho.cnes) linhas.push(`CNES: ${cabecalho.cnes}`)
  if (cabecalho.nomeEstabelecimento) linhas.push(`ESTABELECIMENTO: ${cabecalho.nomeEstabelecimento}`)
  if (cabecalho.uf) linhas.push(`UF: ${cabecalho.uf}`)
  if (cabecalho.mesAno) linhas.push(`MES/ANO: ${cabecalho.mesAno}`)
  linhas.push(sep)

  // BPA-C
  if (dados.bpaC.length > 0) {
    linhas.push('')
    linhas.push('BPA-C (CONSOLIDADO)')
    linhas.push(sepMenor)
    linhas.push('CODIGO     | PROCEDIMENTO                        | CBO    | QTD')
    linhas.push(sepMenor)
    dados.bpaC.forEach(reg => {
      linhas.push(
        `${String(reg.codigo).padEnd(10)} | ${String(reg.procedimento_nome).substring(0, 35).padEnd(35)} | ${String(reg.cbo).padEnd(6)} | ${reg.quantidade_total}`
      )
    })
    linhas.push(`TOTAL BPA-C: ${dados.bpaC.length} procedimentos`)
  }

  // BPA-I
  if (dados.bpaI.length > 0) {
    linhas.push('')
    linhas.push('BPA-I (INDIVIDUALIZADO)')
    linhas.push(sepMenor)
    dados.bpaI.forEach(reg => {
      linhas.push(`DATA: ${formatarData(reg.data_atendimento)}`)
      linhas.push(`PACIENTE: ${reg.paciente_nome} | CNS: ${reg.cns}`)
      linhas.push(`NASCIMENTO: ${formatarData(reg.data_nascimento)} | SEXO: ${reg.sexo} | RACA: ${reg.raca}`)
      linhas.push(`PROCEDIMENTO: ${reg.procedimento_nome} (${reg.procedimento_codigo}) | QTD: ${reg.quantidade}`)
      linhas.push(`PROFISSIONAL: ${reg.profissional_nome} | CBO: ${reg.cbo}`)
      if (reg.cid) linhas.push(`CID: ${reg.cid}`)
      if (reg.logradouro) linhas.push(`ENDERECO: ${reg.logradouro}, ${reg.numero || 'S/N'} - ${reg.bairro} - CEP: ${reg.cep}`)
      linhas.push(sepMenor)
    })
    linhas.push(`TOTAL BPA-I: ${dados.bpaI.length} atendimentos`)
  }

  linhas.push('')
  linhas.push(`TOTAL GERAL: ${dados.bpaC.length + dados.bpaI.length} registros`)
  linhas.push(sep)

  return linhas.join('\n')
}