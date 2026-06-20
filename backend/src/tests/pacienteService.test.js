//testes do service de paciente

//IMPORTS -----------
import { describe, test, expect } from "vitest";

//importando as funções do service que serão testadas
import { criarPaciente } from "../services/pacienteService";
import { listarPacientes } from "../services/pacienteService";
import { buscarPacientePorId } from "../services/pacienteService";
import { atualizarPaciente } from "../services/pacienteService";
import { deletarPaciente } from "../services/pacienteService";

//TESTES CRIAR PACIENTE -----------
describe("Testes para criar paciente", () => {

    //Teste 1
    test("Deve criar um paciente com dados válidos", async () => {
        const sufixo = String(Date.now()).slice(-9);
        const cpf = `12${sufixo}`;
        const cns = `123456${sufixo}`;

        const paciente = await criarPaciente({
            nome: "João Silva",
            data_nascimento: "1990-01-01",
            cpf,
            sexo: "Masculino",
            raca: "Branca",
            etnia: "Não informado",
            nacionalidade: "Brasileiro",
            cns,
            endereco: {
                cep: "12345-678",
                logradouro: "Rua A",
                numero: "123",
                bairro: "Centro",
                cidade: "Recife",
                uf: "PE"
            }
        });

        expect(paciente).toHaveProperty("id");
        expect(paciente.nome).toBe("João Silva");
        expect(paciente.data_nascimento).toBe("1990-01-01");
        expect(paciente.cpf).toBe(cpf);
        expect(paciente.sexo).toBe("Masculino");
        expect(paciente.raca).toBe("Branca");
        expect(paciente.etnia).toBe("Não informado");
        expect(paciente.nacionalidade).toBe("Brasileiro");
        expect(paciente.cns).toBe(cns);
        expect(paciente.cep).toBe("12345-678");
        expect(paciente.logradouro).toBe("Rua A");
        expect(paciente.numero).toBe("123");
        expect(paciente.bairro).toBe("Centro");
        expect(paciente.cidade).toBe("Recife");
        expect(paciente.uf).toBe("PE");
    });

    //Teste 2
    test("Não deve criar um paciente com data de nascimento inválida", async () => {
        await expect(
            criarPaciente({
                nome: "João Silva",
                data_nascimento: "invalid-date",
                cpf: "12345678902",
                sexo: "M",
                raca: "Branca",
                etnia: "Não informado",
                nacionalidade: "Brasileiro",
                cns: "123456789012346",
                endereco: {
                    cep: "12345-678",
                    logradouro: "Rua A",
                    numero: "123",
                    bairro: "Centro",
                    cidade: "Recife",
                    uf: "PE"
                }
            })
        ).rejects.toThrow("Data de nascimento inválida. Deve ser uma data válida.");
    });

    //Teste 3
    test("Não deve criar um paciente com data de nascimento futura", async () => {
        const dataFutura = new Date();
        dataFutura.setDate(dataFutura.getDate() + 1); //data de amanhã

        await expect(
            criarPaciente({
                nome: "João Silva",
                data_nascimento: dataFutura.toISOString().split("T")[0],
                cpf: "12345678903",
                sexo: "M",
                raca: "Branca",
                etnia: "Não informado",
                nacionalidade: "Brasileiro",
                cns: "123456789012347",
                endereco: {
                    cep: "12345-678",
                    logradouro: "Rua A",
                    numero: "123",
                    bairro: "Centro",
                    cidade: "Recife",
                    uf: "PE"
                }
            })
        ).rejects.toThrow("Data de nascimento não pode ser futura.");
    });

    //Teste 4
    test("Não deve criar um paciente com sexo inválido", async () => {
        await expect(
            criarPaciente({
                nome: "João Silva",
                data_nascimento: "1990-01-01",
                cpf: "12345678904",
                sexo: "X", //sexo inválido
                raca: "Branca",
                etnia: "Não informado",
                nacionalidade: "Brasileiro",
                cns: "123456789012348",
                endereco: {
                    cep: "12345-678",
                    logradouro: "Rua A",
                    numero: "123",
                    bairro: "Centro",
                    cidade: "Recife",
                    uf: "PE"
                }
            })
        ).rejects.toThrow("Sexo inválido. Deve ser 'M' ou 'F'.");
    });

    //Teste 5
    test("Não deve criar um paciente com cpf inválido", async () => {
        await expect(
            criarPaciente({
                nome: "João Silva",
                data_nascimento: "1990-01-01",
                cpf: "12345", //cpf inválido pela quantidade de dígitos
                sexo: "M",
                raca: "Branca",
                etnia: "Não informado",
                nacionalidade: "Brasileiro",
                cns: "123456789012349",
                endereco: {
                    cep: "12345-678",
                    logradouro: "Rua A",
                    numero: "123",
                    bairro: "Centro",
                    cidade: "Recife",
                    uf: "PE"
                }
            })
        ).rejects.toThrow("CPF inválido. Deve conter exatamente 11 dígitos numéricos.");
    });

    //Teste 6 -- add outros testes p/ todas as regras de validação, como campos obrigatórios, formato do endereço, etc.
});

//TESTES LISTAR PACIENTES -----------

//TESTES BUSCAR PACIENTE POR ID -----------

//TESTES ATUALIZAR PACIENTE -----------

//TESTES DELETAR PACIENTE -----------
