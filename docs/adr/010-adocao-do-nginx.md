# ADR 010 - Adoção do Nginx como Servidor Web e Proxy Reverso

**Status:** Aceito
**Data:** 21/06/2026
**Decisores:** Padrão da disciplina

## 1. Contexto

Após a conclusão da containerização do Sistema BPA utilizando Docker e Docker Compose, o frontend continuava sendo servido através do comando `vite preview`.

Embora essa abordagem seja adequada para desenvolvimento e validação local, a documentação oficial do Vite não recomenda sua utilização em ambientes de produção. Além disso, a arquitetura baseada em Vite Preview não oferece recursos tradicionalmente utilizados em servidores web, como proxy reverso, controle de cache, otimização de entrega de arquivos estáticos e integração simplificada com HTTPS.

## 2. Decisão

Foi decidido substituir o uso do Vite Preview pelo Nginx como servidor web do frontend.
A nova arquitetura utiliza:
* Nginx para servir os arquivos estáticos gerados pelo React após a execução do comando `npm run build`;
* Nginx como proxy reverso para encaminhar as requisições da API (`/api`) para o backend Express;
* Docker Compose para orquestrar a comunicação entre os containers;
* Build multi-stage no Dockerfile do frontend, separando a etapa de construção da aplicação da etapa de execução do servidor web.

Com essa abordagem, os usuários passam a acessar a aplicação por meio de uma única porta exposta pelo Nginx, enquanto a comunicação com o backend ocorre internamente na rede Docker.

## 3. Consequências Positivas

* Aproxima a arquitetura do projeto de um ambiente real de produção;
* Melhora o desempenho na entrega dos arquivos estáticos do frontend;
* Reduz o consumo de recursos em comparação ao uso do Vite Preview;
* Centraliza o acesso à aplicação por meio de um único ponto de entrada;
* Simplifica a comunicação entre frontend e backend através do proxy reverso;
* Facilita futuras implementações de HTTPS e certificados SSL/TLS;
* Possibilita a aplicação de estratégias de cache e otimização de conteúdo;
* Reduz o tamanho da imagem final do frontend por meio do build multi-stage.

## 4. Consequências Negativas

* Introduz uma camada adicional de configuração e manutenção na infraestrutura;
* Exige conhecimento básico de configuração do Nginx por parte da equipe;
* Aumenta a complexidade do processo de troubleshooting em caso de falhas de comunicação entre frontend e backend;
* Qualquer alteração nas regras de proxy ou roteamento exige atualização do arquivo `nginx.conf`.