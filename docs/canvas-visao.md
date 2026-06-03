# Canvas de Visão de Projeto

> Este arquivo é apenas o exemplo do que deve estar no repositório do projeto.
>
> Ou seja, o canvas preenchido deve ser versionado no repositório da equipe em `docs/canvas-visao.md` e atualizado se o escopo mudar significativamente após qualquer Sprint Review.

---

# 1. Problema Central

**O problema é:**

Preenchimento de Boletim de Produção Ambulatorial (BPA) de forma manual, arriscando informações cruciais para prestação de contas ao Sistema Único de Saúde (SUS).

**Evidência que esse problema existe:**

Em reuniões com os stakeholders, foi levantado que a Clínica de Especialidades Odontológicas pode perder investimentos - caso não haja o fornecimento correto do BPA - para realização do trabalho destinado à população que é encaminhada para o local.

---

# 2. Persona Principal

| Campo | Resposta |
|---------|---------|
| Nome fictício | André Silva |
| Papel / Função | Faturista - Pessoa responsável pelo preenchimento do BPA. |
| Principal dor | Preenchimento manual preciso de relatório. |
| O que ela precisa fazer hoje? | Ler todas as informações dos históricos do paciente e ter que transcrevê-los para o relatório, relacionando-os entre o BPA-I e BPA-C. Realizar cálculos manualmente, quantidade de pacientes e procedimentos. |
| O que ela ganha com o produto? | Além da automatização do preenchimento e da geração de arquivos do BPA para envio, o sistema visa disponibilizar visualização de um dashboard com dados completos baseados em períodos personalizados pelo faturista, como por exemplo, quantidade de atendimentos realizados. |

---

# 3. Proposta de Valor

Para o faturista que necessita preencher o BPA manualmente, o Boletim de Produção Ambulatorial Digital é um sistema web que automatiza o registro, validação e consolidação dos dados, reduzindo erros e o tempo de preenchimento. Diferente de processos manuais em papel e planilhas, nossa solução integra as informações em um único sistema, realiza cálculos automaticamente e facilita a geração e envio dos dados ao SUS.

---

# 4. Escopo do Produto Mínimo Viável (MVP)

## 4.1 Dentro do MVP (Must have - será entregue)

- RF01, 02 e 03 – Controle de Cadastro de Profissionais/estudantes, pacientes e faturista;
- RF04 – Registro de Atendimentos;
- RF05 – Download e exportação do relatório;
- RF06 – Dashboard.

## 4.2 Fora do MVP, mas identificado (Could have - próximas versões)

Item 1 - No lugar do faturista realizar o cadastro do profissional e do paciente, o sistema poderia receber essas informações já do histórico digital do paciente (solução desenvolvida por outra equipe) e o BPA Digital faria apenas o preenchimento de BPA e do dashboard de maneira automatizada;

## 4.3 Fora do escopo (won’t have - não será feito neste semestre)

Item 1 - Integração com o TI Saúde e/ou outro sistema de saúde que a clínica já utilize.

---

# 5. Riscos e Premissas

| Risco / Premissa | Probabilidade | Impacto | Mitigação |
|------------------|--------------|----------|-----------|
| Devido a problemas burocráticos e/ou de infraestrutura, é possível que o sistema não seja implementado de forma imediata na CEO. | Alta | Médio | No que se refere a equipe, não há opções de soluções que possam ser propostas, pois burocracias de implementação para o uso do sistema e problemas de infraestrutura não estão dentro do escopo da equipe. |
| Escopo maior que o estimado. | Alta | Alto | A gerência em conjunto com o product owner responsável deve equilibrar as expectativas do stakeholder durante as reuniões e fechar o escopo nas funcionalidades que tragam valor real para o produto final. |
| Dificuldade técnica não antecipada. | Alta | Alto | Deve ser organizado um cronograma de estudos sobre a habilidade técnica em questão para a equipe, para que haja um equilíbrio técnico e seja possível o desenvolvimento da solução. |

---

# 6. Stack e decisões técnicas iniciais

| Camada | Decisão | Justificativa |
|----------|----------|--------------|
| Camada de Aplicação - Backend | Node.js + Express | Padrão da disciplina |
| Camada de Apresentação - Frontend | React via Vite | Padrão da disciplina |
| Camada de Persistência - Banco de Dados | PostgreSQL | Além de gratuito, este garante confiabilidade e a durabilidade dos dados. |
| Deploy (ainda a ser estudado) | (ainda a ser estudado) | |

---

# 7. Marcos do semestre

| Marco | Data | O que será entregue |
|---------|------|---------------------|
| Review Sprint 0 | 09/04 | Protótipo hi-fi validado + backlog priorizado + escopo fechado. |
| Review Sprint 1 | 30/04 | Primeiras funcionalidades funcionando. |
| Review Sprint 2 | 14/05 | Features core do MVP. |
| Review Sprint 3 | 28/05 | Qualidade e refactoring aplicados. |
| Review Sprint 4 | 11/06 | MVP estabilizado, documentado e pronto para entrega. |
| Entrega formal | 18/06 | Produto entregue ao stakeholder. |
| Apresentação | 29-30/06 | Apresentação acadêmica final. |

---

# 8. Equipe

| Nome | Papel |
|--------|--------|
| Layse Gomes | Product Owner |
| Ana Clara Bizarria | Gerente de Projetos |
| Jaianny Souza | Desenvolvedora Backend |
| Maria Claudia Rocha | Desenvolvedora Backend |
| Samara Petrilly | Desenvolvedora Backend |
| Raiana Donato | Designer & Desenvolvedora Frontend |
| Byanca Souza | Desenvolvedora Frontend |

---

*Canvas de Visão — adaptado da Metodologia Sinfonia (Garcia & Medeiros, 2025) para o contexto do 2º período CIN0136 — Desenvolvimento de Software · CIn-UFPE · 2026.1*