# ADR 002 - Adoção de Arquitetura Monolítica (Monolito)

## Cabeçalho
* **Status:** Aceito
* **Data:** 30/04/2026
* **Decisores:** Ana Clara Bizarria, Byanca Souza, Jaianny Souza, Layse Gomes, Maria Claudia Rocha, Raiana Donato e Samara Petrilly. 

## Contexto
Ao iniciar o projeto do sistema de faturamento do Boletim de Produção Ambulatorial (BPA), tornou-se necessário decidir como os componentes estruturais do sistema (Front-end e Back-end) seriam organizados, distribuídos e conectados. O principal objetivo técnico é escolher uma macroarquitetura que viabilize máxima agilidade no desenvolvimento inicial e facilidade extrema de manutenção. Dado que o projeto é conduzido por uma equipe enxuta, precisamos de uma solução que centralize o código e elimine barreiras operacionais complexas de infraestrutura e gerenciamento de redes distribuídas neste estágio do ciclo de vida do software.

## Decisão

**Por que escolhemos a Arquitetura Monolótica?**
* **Velocidade de Desenvolvimento (Time-to-market):** Como o projeto está em fase de validação e nem todas as regras de negócio do BPA estão rigidamente consolidadas, o monolito permite realizar alterações estruturais profundas e refatorações no código rapidamente, sem a necessidade de gerenciar contratos complexos ou versionamento de APIs entre múltiplos serviços isolados.
* **Baixa Complexidade de Rede:** Ao concentrar o sistema em uma única unidade de execução, eliminamos completamente preocupações nativas de sistemas distribuídos, tais como falhas de comunicação inter-serviços, latência de rede, gerenciamento de service mesh ou arquiteturas de autenticação e autorização descentralizadas.
* **Otimização para Equipes Enxutas:** Centralizar o código-fonte permite que toda a equipe detenha o conhecimento holístico da plataforma. Isso reduz drasticamente o atrito de contexto e elimina a necessidade de alternar e coordenar múltiplos repositórios no Git.

**Por que acoplar a estratégia de Front-end (React + Vite) e Back-end?**
* **Deploy e Orquestração Simplificados:** A publicação do ecossistema de software reduz-se a um único pipeline de deploy. Isso simplifica drasticamente a gestão da infraestrutura, barateia os custos de hospedagem e evita a necessidade de ferramentas complexas de orquestração de containers nesta fase acadêmica.
* **Sincronia de Contratos de Dados:** A integração entre a interface do usuário e os endpoints de faturamento ocorre de forma direta e transparente, permitindo que alterações em tabelas ou rotas do backend sejam refletidas e testadas imediatamente no frontend sem quebras invisíveis.

Decidimos adotar a **Arquitetura Monolítica (Monolito)** como o padrão estrutural do projeto.
* **Distribuição:** Os componentes de interface (React/Vite) e processamento (Node.js) coexistirão de forma integrada, sendo implantados e distribuídos como uma única aplicação coesa.
* **Comunicação:** Os fluxos de dados serão centralizados, utilizando chamadas de API REST diretas e síncronas trafegadas em formato JSON, eliminando camadas desnecessárias de mensageria ou RPC para este escopo.

## Consequências

### Positivas
* **Deploy mais simples:** Fica consideravelmente mais fácil realizar a publicação e manutenção do sistema, já que tudo se resume a uma única aplicação ativa.
* **Menos complicação na comunicação:** Como a arquitetura corre junta, mitigamos problemas de timeout de rede e necessidade de lidar com protocolos complexos de comunicação distribuída (como gRPC).
* **Dados consistentes e refatoração segura:** Capacidade de alterar regras de ponta a ponta (da tela ao banco de dados) em um único ciclo de desenvolvimento com maior previsibilidade.
* **Curva de aprendizado reduzida:** Facilita a integração e o trabalho paralelo de todas as integrantes da equipe dentro do mesmo ecossistema de arquivos.

### Negativas
* **Escalabilidade horizontal limitada:** Não há isolamento de componentes. Se o módulo de processamento de faturamento do BPA exigir mais performance, todo o ecossistema (inclusive a interface estática) precisará ser escalado uniformemente.
* **Risco de endividamento técnico (Monolito de Lama):** A falta de barreiras físicas entre os módulos exige disciplina rigorosa de design de código por parte do time para evitar acoplamentos nocivos entre módulos distintos.
* **Aumento progressivo do tempo de build:** À medida que o volume de arquivos de frontend e backend crescer, os testes e o processo de compilação da aplicação unificada se tornarâo mais lentos.
* **Ponto único de falha (SPOF):** Uma excecão grave não tratada ou erro de runtime no backend tem o potencial intrínseco de derrubar a interface e indisponibilizar a aplicação inteira.