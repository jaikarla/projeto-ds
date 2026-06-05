# ADR 003 — Estilização com CSS Modules

**Status:** Aceito
**Data:** 30/04/2026
**Decisores:** Byanca Souza e Raiana Laís

## 1. Contexto
Durante o desenvolvimento da interface, percebemos que o uso de CSS global poderia causar conflitos de estilos entre diferentes componentes. Precisávamos de uma solução que garantisse o isolamento visual e que fosse fácil de manter sem exigir uma curva de aprendizado alta para a equipe.

## 2. Decisão
Foi decidido utilizar CSS Modules para a estilização do front-end. 

Desta forma, cada componente terá o seu próprio arquivo de estilo e as classes serão transformadas automaticamente em nomes únicos, evitando que um estilo interfira noutro. A comunicação entre o estilo e o componente será feita através da importação de objetos no JavaScript.

## 3. Consequências

### 3.1 Positivas
- Isolamento de estilos: Garante que as classes não se sobreponham.
- Desenvolvimento intuitivo: Permite o uso de CSS padrão.
- Manutenibilidade: Facilita a localização e alteração de estilos específicos de um componente.

### 3.2 Negativas
- Quantidade de arquivos: Gera um arquivo .module.css para cada componente.
- Configuração inicial: Exige suporte do ambiente de build (Vite/Webpack).
- Estilos Globais: Requer cuidado extra para gerir estilos que devem ser partilhados por toda a aplicação.
