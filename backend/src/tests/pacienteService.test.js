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
    test.skip("Deve criar um paciente com dados válidos", () => {
        const paciente = criarPaciente({
            nomeCompleto: "João Silva",
            dataNascimento: "1990-01-01",
            cpf: "12345678901",
            sexo: "M",
            raca: "Branca",
            nacionalidade: "Brasileiro",
            cns: "123456789012345",
            endereco: {
                rua: "Rua A",
                numero: "123",
                bairro: "Centro",
                cidade: "Recife",
                estado: "PE"
            }
        });

        expect(paciente).toHaveProperty("id");
        expect(paciente.nomeCompleto).toBe("João Silva");
        expect(paciente.dataNascimento).toBe("1990-01-01");
        expect(paciente.cpf).toBe("12345678901");
        expect(paciente.sexo).toBe("M");
        expect(paciente.raca).toBe("Branca");
        expect(paciente.nacionalidade).toBe("Brasileiro");
        expect(paciente.cns).toBe("123456789012345");
        expect(paciente.endereco.rua).toBe("Rua A");
        expect(paciente.endereco.numero).toBe("123");
        expect(paciente.endereco.bairro).toBe("Centro");
        expect(paciente.endereco.cidade).toBe("Recife");
        expect(paciente.endereco.estado).toBe("PE");
    });

    //Teste 2
    test.skip("Não deve criar um paciente com data de nascimento inválida", () => {
        expect(() => {
            criarPaciente({
                nomeCompleto: "João Silva",
                dataNascimento: "invalid-date",
                cpf: "12345678902",
                sexo: "M",
                raca: "Branca",
                nacionalidade: "Brasileiro",
                cns: "123456789012346",
                endereco: {
                    rua: "Rua A",
                    numero: "123",
                    bairro: "Centro",
                    cidade: "Recife",
                    estado: "PE"
                }
            });
        }).toThrow("Data de nascimento inválida. Deve ser uma data válida.");
    });

    //Teste 3
    test.skip("Não deve criar um paciente com data de nascimento futura", () => {
        const dataFutura = new Date();
        dataFutura.setDate(dataFutura.getDate() + 1); //data de amanhã
        expect(() => {
            criarPaciente({
                nomeCompleto: "João Silva",
                dataNascimento: dataFutura.toISOString().split("T")[0],
                cpf: "12345678903",
                sexo: "M",
                raca: "Branca",
                nacionalidade: "Brasileiro",
                cns: "123456789012347",
                endereco: {
                    rua: "Rua A",
                    numero: "123",
                    bairro: "Centro",
                    cidade: "Recife",
                    estado: "PE"
                }
            });
        }).toThrow("Data de nascimento não pode ser futura.");
    });

    //Teste 4
    test.skip("Não deve criar um paciente com sexo inválido", () => {
        expect(() => {
            criarPaciente({
                nomeCompleto: "João Silva",
                dataNascimento: "1990-01-01",
                cpf: "12345678904",
                sexo: "X", //sexo inválido
                raca: "Branca",
                nacionalidade: "Brasileiro",
                cns: "123456789012348",
                endereco: {
                    rua: "Rua A",
                    numero: "123",
                    bairro: "Centro",
                    cidade: "Recife",
                    estado: "PE"
                }
            });
        }).toThrow("Sexo inválido. Deve ser 'M' ou 'F'.");
    });

    //Teste 5
    test("Não deve criar um paciente com cpf inválido", () => {
        expect(() => {
            criarPaciente({
                nomeCompleto: "João Silva",
                dataNascimento: "1990-01-01",
                cpf: "12345", //cpf inválido pela quantidade de dígitos
                sexo: "M",
                raca: "Branca",
                nacionalidade: "Brasileiro",
                cns: "123456789012349",
                endereco: {
                    rua: "Rua A",
                    numero: "123",
                    bairro: "Centro",
                    cidade: "Recife",
                    estado: "PE"
                }
            });
        }).toThrow("CPF inválido. Deve conter exatamente 11 dígitos numéricos.");
    });

    //Teste 6 -- add outros testes p/ todas as regras de validação, como campos obrigatórios, formato do endereço, etc.
});

//TESTES LISTAR PACIENTES -----------

//TESTES BUSCAR PACIENTE POR ID -----------

//TESTES ATUALIZAR PACIENTE -----------

//TESTES DELETAR PACIENTE -----------