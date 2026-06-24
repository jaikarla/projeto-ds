# ADR 008 - Substituição do Axios pela Fetch API nativa

**Status:** Aceito
**Data:** 20/06/2026
**Decisores:** Jaianny Souza

## 1. Contexto

​No desenvolvimento inicial do frontend, a biblioteca `axios` estava mapeada como dependência para gerenciar as requisições HTTP junto ao backend. No entanto, o ecossistema do JavaScript moderno (incluindo o suporte nativo do React 19) fornece ferramentas robustas que reduzem a necessidade de bibliotecas de terceiros para operações comuns de rede. Como o projeto BPA preza por uma arquitetura limpa, minimalista e com o menor número possível de dependências externas, o uso de um pacote extra de terceiros para chamadas de API comuns tornou-se redundante.

## 2. Decisão

​Decidimos remover completamente o axios das dependências do frontend e adotar exclusivamente a Fetch API nativa do navegador para realizar todas as requisições assíncronas (GET, POST, PATCH, etc.) da aplicação.

## 3. Consequências Positivas

* Redução do Bundle Size: O projeto ficou mais leve, eliminando bytes desnecessários do pacote final gerado para o navegador;
* Segurança e Manutenibilidade: Menos uma dependência de terceiros no package.json significa menor exposição a vulnerabilidades de segurança de pacotes (supply chain attacks) e zero preocupação com quebras de compatibilidade em atualizações futuras do Axios;
* Padronização: O código passa a usar o padrão global da Web, facilitando a leitura por qualquer desenvolvedor que conheça JavaScript moderno.

## 4. Consequências Negativas

* Tratamento Manual de Erros: Diferente do Axios (que rejeita a Promise automaticamente em status HTTP de erro como 400 ou 500), o fetch resolve a Promise com sucesso mesmo se o servidor retornar um erro. O time precisa checar manualmente a propriedade response.ok no código;
* Serialização Explícita: Tornou-se obrigatório o uso de JSON.stringify (dados) no corpo (body) das requisições de envio e a declaração explícita do cabeçalho 'Content-Type': 'application/json'.
