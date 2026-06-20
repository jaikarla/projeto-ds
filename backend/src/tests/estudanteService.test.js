//testes do service de estudante

//IMPORTS -----------
import { describe, test, expect } from "vitest";

//importando as funções do service que serão testadas
import { criarEstudante } from "../services/estudantesService";
import { listarEstudantes } from "../services/estudantesService";
import { buscarEstudantePorId } from "../services/estudantesService";
import { atualizarEstudante } from "../services/estudantesService";
import { deletarEstudante } from "../services/estudantesService";

//TESTES CRIAR ESTUDANTE -----------
describe("Testes para criar estudante", () => {
    //Teste 1
    test("Deve criar um estudante com dados válidos", async () => {
        const sufixo = String(Date.now()).slice(-9);
        const cpf = `98${sufixo}`;
        const cns = `543210${sufixo}`;
        const matricula = `20${sufixo}`;

        const estudante = await criarEstudante({
            nome: "Maria Souza",
            cpf,
            cns,
            dataNascimento: "1995-05-15",
            matricula,
            cbo: "123456"
        });

        expect(estudante).toHaveProperty("id");
        expect(estudante.nome).toBe("Maria Souza");
        expect(estudante.cpf).toBe(cpf);
        expect(estudante.cns).toBe(cns);
        expect(estudante.matricula).toBe(matricula);
        expect(estudante.cbo).toBe("Estudante");
    });

    //Teste 2
    test("Não deve criar um estudante com data de nascimento inválida", async () => {
        await expect(
            criarEstudante({
                nome: "Maria Souza",
                cpf: "98765432101",
                cns: "543210987654322",
                dataNascimento: "invalid-date",
                matricula: "20230002",
                cbo: "123456"
            })
        ).rejects.toThrow("Data de nascimento inválida. Deve estar no formato YYYY-MM-DD.");
    });

    //Teste 3
    test("Não deve criar um estudante com CPF inválido", async () => {
        await expect(
            criarEstudante({
                nome: "Maria Souza",
                cpf: "9876543211", //CPF com 10 dígitos, inválido
                cns: "543210987654322",
                dataNascimento: "1995-05-15",
                matricula: "20230002",
                cbo: "123456"
            })
        ).rejects.toThrow("CPF inválido.");
    });

    //Teste 4
    test("Não deve criar um estudante com CNS inválido", async () => {
        await expect(
            criarEstudante({
                nome: "Maria Souza",
                cpf: "98765432100",
                cns: "54321098765432", //CNS com 14 dígitos, inválido
                dataNascimento: "1995-05-15",
                matricula: "20230002",
                cbo: "123456"
            })
        ).rejects.toThrow("CNS inválido.");
    });

    //Teste 5
    test("Não deve criar um estudante com data de nascimento futura", async () => {
        const dataFutura = new Date();
        dataFutura.setDate(dataFutura.getDate() + 1); // define a data para amanhã

        await expect(
            criarEstudante({
                nome: "Maria Souza",
                cpf: "98765432100",
                cns: "543210987654321",
                dataNascimento: dataFutura.toISOString().split('T')[0],
                matricula: "20230002",
                cbo: "123456"
            })
        ).rejects.toThrow("Data de nascimento não pode ser futura");
    });

});

//TESTES LISTAR ESTUDANTES -----------

//TESTES BUSCAR ESTUDANTE POR ID -----------

//TESTES ATUALIZAR ESTUDANTE -----------

//TESTES DELETAR ESTUDANTE -----------
