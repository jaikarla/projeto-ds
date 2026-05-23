//testes do services de profissional

//IMPORTS -----------
import { describe, test, expect } from "vitest";
//describe - utilizada para agrupar testes relacionados;
//test - define um caso de teste específico;
//expect - é usada para fazer asserções, ou seja, verificar se os resultados dos testes estão de acordo com o esperado.

//importando a função CRIAR de profissional para testar
import { criarProfissional } from "../services/profissionalService";
import { listarProfissionais } from "../services/profissionalService"; //função listar
import { buscarProfissionalPorId } from "../services/profissionalService"; //função buscar por id
import { atualizarProfissional } from "../services/profissionalService"; //função atualizar
import { deletarProfissional } from "../services/profissionalService"; //função deletar 

//TESTES CRIAR PROFISSIONAL -----------
describe("Testes para criar profissional", () => {
    //atenção: os testes estão com a função "skip" para não serem executados todos de uma vez, já que alguns deles dependem de um estado específico do "banco de dados" (array de profissionais) para testar as duplicidades. Para testar cada um, basta retirar o "skip" do teste correspondente.

    //Teste 1
    test("Deve criar um profissional com dados válidos", () => {
        const profissional = criarProfissional({
            nomeCompleto: "Ana Clara Bizarria",
            cpf: "12345678901",
            cro: "CRO-12345",
            ufConselho: "PE",
            cns: "123456789012345",
            especialidade: "Cirurgiã Dentista",
            status: "Ativo"
        });
    
    //como o id é gerado automaticamente, não podemos prever seu valor exato;
    expect(profissional).toHaveProperty("id");
    expect(profissional.nomeCompleto).toBe("Ana Clara Bizarria");
    expect(profissional.cpf).toBe("12345678901");
    expect(profissional.cro).toBe("CRO-12345");
    expect(profissional.ufConselho).toBe("PE");
    expect(profissional.cns).toBe("123456789012345");
    expect(profissional.especialidade).toBe("Cirurgiã Dentista");

    });

    //Teste 2
    test.skip("Deve exibir erro para cpf inválido.", () => {
        expect(() => {

            criarProfissional({
                nomeCompleto: "Raiana Donato",
                cpf: "12345", //cpf inválido pela quantidade de dígitos
                cro: "CRO-54321",
                ufConselho: "PE",
                cns: "543210987654321",
                especialidade: "Ortodontista",
            })
        }).toThrow("CPF inválido. Deve conter exatamente 11 dígitos numéricos.");
    });

    //Teste 3
    test.skip("Deve exibir erro para cro inválido.", () => {
        expect(() => {

            criarProfissional({
                nomeCompleto: "Alana Silva",
                cpf: "98765432109",
                cro: "CR-12345", //cro inválido pelo formato
                ufConselho: "PE",
                cns: "987654321012345",
                especialidade: "Endodontista",
            })
        }).toThrow("CRO inválido. Verifique o formato correto (ex: CRO-12345).");
    });

    //Teste 4
    test.skip("Deve exibir erro para cns inválido.", () => {
        expect(() => {

            criarProfissional({
                nomeCompleto: "Bruna Oliveira",
                cpf: "56789012345",
                cro: "CRO-67890",
                ufConselho: "PE",
                cns: "12345", //cns inválido pela quantidade de dígitos
                especialidade: "Periodontista",
            })
        }).toThrow("CNS inválido. Deve conter exatamente 15 dígitos numéricos.")
    })

    //Teste 5 
    test.skip("Deve exibir erro por duplicidade - cpf já cadastrado.", () => {

        //primeiro, criamos um profissional com um cpf específico
        criarProfissional({
            nomeCompleto: "Carla Souza",
            cpf: "11122233344", //cpf específico para o teste de duplicidade
            cro: "CRO-54321",
            ufConselho: "PE",
            cns: "543210987654329",
            especialidade: "Cirurgiã Dentista",
        });

        expect(() => {
            //criamos outro profissional com o mesmo cpf
            criarProfissional({
                nomeCompleto: "Mariana Lima",
                cpf: "11122233344",
                cro: "CRO-54321",
                ufConselho: "PE",
                cns: "543210987654329",
                especialidade: "Cirurgiã Dentista",
            })
        }).toThrow("CPF já cadastrado.");
    });

    //Teste 6
    test.skip("Deve exibir erro por duplicidade - cro já cadastrado.", () => {
        //primeiro, criamos um profissional com um cro específico
        criarProfissional({
            nomeCompleto: "Carla Souza",
            cpf: "11122233324",
            cro: "CRO-56038", //cro específico para o teste de duplicidade
            ufConselho: "PE",
            cns: "543210987654321",
            especialidade: "Cirurgiã Dentista",
        });

        expect(() => {
            //criamos outro profissional com o mesmo cro
            criarProfissional({
                nomeCompleto: "Mariana Lima",
                cpf: "22233344455",
                cro: "CRO-56038",
                ufConselho: "PE",
                cns: "543210987654331",
                especialidade: "Cirurgiã Dentista",
            })
        }).toThrow("CRO já cadastrado.");
    });

    //Teste 7
    test.skip("Deve exibir erro por duplicidade - cns já cadastrado.", () => {
        //primeiro, criamos um profissional com um cns específico
        criarProfissional({
            nomeCompleto: "Carla Souza",
            cpf: "11123233344",
            cro: "CRO-54331",
            ufConselho: "PE",
            cns: "345679240163972", //cns específico para o teste de duplicidade
            especialidade: "Cirurgiã Dentista",
        });

        expect(() => {
            //criamos outro profissional com o mesmo cns
            criarProfissional({
                nomeCompleto: "Mariana Lima",
                cpf: "99988877766",
                cro: "CRO-67890",
                ufConselho: "PE",
                cns: "345679240163972",
                especialidade: "Cirurgiã Dentista",
            })
        }).toThrow("CNS já cadastrado.");
    });
});

//TESTES LISTAR PROFISSIONAL -----------
describe("Testes para listar profissionais", () => {

    test.skip("Deve listar todos os profissionais cadastrados", () => {
        const profissionais = listarProfissionais();
        expect(Array.isArray(profissionais)).toBe(true); //verifica se o resultado é um array
    });
});

//TESTE BUSCAR POR ID -----------

//TESTE ATUALIZAR PROFISSIONAL -----------

//TESTE DELETAR PROFISSIONAL -----------
