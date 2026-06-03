# ADR-004: Evolução da Arquitetura do Banco de Dados (Local para Nuvem)

**Status:** Aceito
**Data:** 21/05/2026
**Decisores:** Samara Petrilly e Layse Gomes

## 1. Contexto

O sistema do Boletim de Produção Ambulatorial (BPA) lida com dados críticos da clínica, exigindo uma base sólida para manter as informações consistentes. Por isso, escolhemos o PostgreSQL, um banco relacional extremamente robusto e ideal para gerenciar esses relacionamentos.

Inicialmente, o banco foi configurado para rodar apenas localmente na máquina de cada integrante. Essa escolha foi feita para não atrasar a entrega do projeto e pelo receio inicial de que os planos gratuitos de servidores na nuvem não comportassem o alto volume mensal de dados gerado pela clínica.

No entanto, essa abordagem criou problemas: os dados não eram compartilhados entre a equipa, isolando os testes, e gerou uma grande incerteza técnica sobre como o sistema seria apresentado à banca de professores e stakeholders sem depender de uma instalação local no dia.

Para resolver isso, decidimos migrar a hospedagem para a nuvem usando o Neon. O Neon foi a escolha ideal porque o seu modelo economiza recursos do plano gratuito (hibernando quando não está em uso) e, por fornecer um ambiente PostgreSQL puro, não exigiu nenhuma alteração na lógica do nosso código, bastando atualizar as credenciais no arquivo `.env`. Assim, garantimos a sincronia da equipa de forma simples e uma apresentação final totalmente segura e acessível.

## 2. Decisão

**Por que escolhemos o PostgreSQL?**
* **Integridade e Confiabilidade:** O sistema do Boletim de Produção Ambulatorial (BPA) lida com dados sensíveis e críticos da área da saúde. O PostgreSQL é um dos bancos de dados relacionais mais robustos do mercado, ideal para garantir que essas informações fiquem sempre consistentes e seguras.
* **Estruturação Relacional:** O projeto possui muitas tabelas que se conectam rigidamente (como faturistas, pacientes e procedimentos). O Postgres é excelente para lidar com essas ligações complexas (JOINs) mantendo a integridade referencial.

**Por que escolhemos o Neon para a Nuvem?**
A adoção do Neon foi a evolução arquitetural para resolver problemas práticos do ambiente de desenvolvimento e da entrega final:
* **Sincronia da Equipa:** Na arquitetura inicial, o banco rodava apenas localmente e os dados não eram compartilhados entre as máquinas da equipa. O Neon centralizou o banco na nuvem, permitindo que todas testem o código consumindo a mesma base de dados atualizada.
* **Custo-Benefício (Serverless):** A equipa tinha a preocupação válida de que planos gratuitos em nuvem não comportassem o volume de dados da clínica CEO. O Neon resolve isso com o seu modelo *Serverless*: o banco "hiberna" quando não está sendo acessado, o que economiza recursos e faz o plano gratuito render muito mais para projetos académicos.
* **Migração Transparente:** Como o Neon fornece um ambiente PostgreSQL puro, não foi necessário refatorar a lógica de programação do projeto para realizar a migração. Bastou atualizar as credenciais do arquivo `.env` e adicionar a regra de segurança SSL.

Decidimos migrar a hospedagem do banco de dados para o **Neon**, mantendo a tecnologia base (PostgreSQL 17), mas adotando uma infraestrutura Serverless.
* **Estrutura e Dados:** O schema de tabelas (`schema.sql`) e a carga inicial com os 94 procedimentos da CEO (`seed.sql`) foram executados remotamente no servidor do Neon.
* **Configuração de Ambiente:** As credenciais locais da equipa no arquivo `.env` foram substituídas pela cadeia de conexão do Neon.
* **Segurança:** O código de conexão na API (`db.js`) foi atualizado para forçar o uso de SSL (`rejectUnauthorized: false`), requisito obrigatório da plataforma.

## 3. Consequências Positivas

* **Unificação do Ambiente:** Toda a equipa agora consome e testa a mesma base de dados, eliminando divergências locais.
* **Prontidão para Apresentação:** O sistema pode ser demonstrado em qualquer computador com acesso à internet, sem a necessidade de instalar o PostgreSQL previamente.
* **Transição Transparente:** A migração não exigiu refatoração da lógica de negócio (controllers/services), apenas um pequeno ajuste no arquivo de configuração do pool de conexão.

## 4. Consequências Negativas

* **Dependência de Rede:** O desenvolvimento do backend passa a exigir conexão constante com a internet.
* **Gestão de Segredos:** Exige a distribuição manual e segura da senha do Neon entre os desenvolvedores, já que o `.env` não é versionado no Git.
* **Limitações Futuras:** Caso o sistema seja efetivamente implantado na CEO, o limite de armazenamento do plano gratuito precisará ser reavaliado.

## 5. Notas de Implementação

* A conexão com o banco é instanciada utilizando o `Pool` da biblioteca `pg`, centralizada no arquivo `src/config/db.js`.
* As regras de ouro da equipa permanecem: nenhuma alteração direta pode ser feita no Neon sem que antes seja registrada e commitada no arquivo `schema.sql`.