# ADR 002 - Adoção de Arquitetura Monolítica (Monolito)

## Status: 
Accepted

## Contexto:
Ao iniciar o projeto, precisamos decidir como os componentes do sistema (Front-end e Back-end) serão estruturados e distribuídos. O objetivo é escolher uma arquitetura que permita agilidade no desenvolvimento inicial e facilidade de manutenção, principalmente por se tratar de um time pequeno, que precisa de algo simples de manter, sem adicionar complexidade desnecessária de infraestrutura.

## Decisão:
Escolhemos a arquitetura de Monolito.

## Justificativa técnica:
- Velocidade de Desenvolvimento: Como o projeto ainda não tem todas as funcionalidades definidas, o monolito permite que a gente mude o código rapidamente sem precisar gerenciar contratos complexos entre múltiplos serviços.
- Baixa Complexidade de Rede: Não precisamos nos preocupar com falhas de comunicação entre serviços, latência de rede ou autenticação distribuída, o que é ideal para o início do projeto.
- Facilidade no Front-end: Usando React e Vite dentro de uma estrutura monolítica, a integração com o back-end é mais direta e o deploy é simplificado.

## Consequências

## Positivas:
- Deploy mais simples: fica bem mais fácil fazer deploy, já que tudo é uma aplicação só. Facilidade com configuração e orquestração. 
- Menos complicação na comunicação: como tudo roda junto, a comunicação é interna (em memória), então não tem latência de rede nem necessidade de lidar com APIs complexas tipo REST ou gRPC. 
- Dados mais consistentes e refatoração mais tranquila: dá pra mexer no sistema todo (front e back) de uma vez só, com mais segurança e sem quebrar tudo no meio do caminho. 
- Melhor pra time pequeno: como é uma aplicação só, a equipe consegue entender o sistema como um todo mais fácil, sem precisar lidar com vários repositórios.

## Negativas:
- Escalabilidade limitada: não dá pra escalar só uma parte do sistema. Se precisar de mais desempenho, tem que subir tudo, o que pode sair caro e ineficiente.
- Risco de virar bagunça: se não tiver organização, os módulos começam a depender demais uns dos outros e o sistema pode virar um “monólito de lama”, difícil de manter.
- Build mais lento com o tempo: conforme o projeto cresce, o tempo de build e testes aumenta, o que pode atrasar o desenvolvimento.
- Ponto único de falha: se der problema em uma parte crítica, pode derrubar a aplicação inteira, já que tudo tá rodando junto.