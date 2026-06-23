# ADR 001 - Backend com Node.js e PostgreSQL

* **Status:** Aceito
* **Data:** 30/04/2026
* **Decisores:** Padrão da disciplina (Escopo predefinido)

## 1. Contexto
Durante a sprint de concepção e especificaçãoo do sistema de BPA (Boletim de Produção Ambulatorial), voltado para a automação e gerenciamento de faturamento no âmbito do Sistema Único de Sapude (SUS), identificou-se a necessidade imperativa de definir a fundaçãoo tecnológica do ecossistema de backend. Esta camada será a responsável direta por processar regras de negócio críticas e complexas, realizar validações estritas de dados de saúde, garantir a persistência segura e íntegra das informações em um banco de dados e fornecer endpoints de alta performance para o consumo da aplicação frontend. Diante disso, tornou-se fundamental documentar os critérios e as justificativas técnicas que guiarão a construção desse servidor de aplicação.

## 2. Decisão
Foi estabelecido o uso de **Node.js com JavaScript** no ambiente de execução do backend, operando em conjunto com o **PostgreSQL** como o sistema de gerenciamento de banco de dados relacional (SGBDR). 

A camada de comunicação entre o cliente e o servidor será estruturada sob o modelo arquitetural **API REST**, trafegando dados exclusivamente no formato JSON. Adicionalmente, para mitigar o acoplamento de código e garantir a manutenibilidade, testabilidade e escalabilidade do projeto, o código-fonte do backend será rigorosamente organizado em uma **arquitetura em camadas** (explicitamente dividida em rotas, controladores, serviços de aplicação e repositórios de dados).

## 3. Consequências Positivas
* **Integração simplificada com o front-end:** O alinhamento tecnológico de utilizar JavaScript tanto no ecossistema do cliente quanto do servidor reduz drasticamente a fricção de serialização de objetos e facilita o compartilhamento mental da lógica de validação por parte da equipe de desenvolvimento.
* **Velocidade de desenvolvimento (Time-to-market):** O ambiente do Node.js, impulsionado pelo gerenciador de pacotes NPM, viabiliza o reaproveitamento de módulos consolidados pela comunidade, acelerando a entrega de valor nas sprints.
* **Unificação da linguagem no projeto:** Centralizar o desenvolvimento em uma única linguagem otimiza o fluxo de trabalho do time de engenharia e reduz o tempo de transição ou nivelamento técnico entre os membros da equipe.
* **Confiabilidade e consistência relacional:** A escolha do PostgreSQL assegura total conformidade com o padrão ACID, fornecendo o suporte robusto e a segurançaa transacional necessários para lidar com históricos e registros de produção ambulatorial sem riscos de corrupção de dados.

## 4. Consequências Negativas
* **Ausência de tipagem estética forte:** Por rodar em JavaScript puro, o sistema perde checagens em tempo de compilação, transferindo a responsabilidade de evitar bugs de tipagem e referências nulas para uma cobertura rigorosa de testes automatizados e validações manuais defensivas no código.
* **Necessidade de governança estrutural manual:** O Node.js não impõe uma estrutura de pastas ou padrões de projeto rígidos de forma nativa. Isso exige disciplina contínua e revisões de código estritas por parte do time para manter a padronização das camadas propostas, evitando o acúmulo de débito técnico.
* **Atenção redobrada na modelagem do banco:** A modelagem de dados para tabelas de faturamento exige mapeamento detalhado de chaves, índices e integridade referencial no PostgreSQL, demandando um cuidado minucioso na criação de esquemas para evitar gargalos de performance em consultas futuras complexas.