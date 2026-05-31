//testes do services de profissional

//IMPORTS -----------
import { describe, test, expect, beforeEach, vi } from "vitest";
//describe - utilizada para agrupar testes relacionados;
//test - define um caso de teste específico;
//expect - é usada para fazer asserções, ou seja, verificar se os resultados dos testes estão de acordo com o esperado.
//beforeEach - é uma função que é executada antes de cada teste, permitindo configurar um ambiente de teste consistente.

//importando a função CRIAR de profissional para testar
import { criarProfissional } from "../services/profissionalService";
import { listarProfissionais } from "../services/profissionalService"; //função listar
import { buscarProfissionalPorId } from "../services/profissionalService"; //função buscar por id
import { atualizarProfissional } from "../services/profissionalService"; //função atualizar
import { deletarProfissional } from "../services/profissionalService"; //função deletar

import Profissional from '../models/profissional.js'; //importando o modelo de profissional para mockar os dados e evitar interações reais com o banco de dados durante os testes

//MOCKS -----------
vi.mock('../models/profissional.js', () => ({
  default: {
    buscar_profissional_cpf: vi.fn(),
    buscar_profissional_cro: vi.fn(),
    buscar_profissional_cns: vi.fn(),
    criar_profissional: vi.fn()
  }
}));

//TESTES CRIAR PROFISSIONAL -----------
describe("Testes para criar profissional", () => {

    //Teste 1
    test("Deve criar um profissional válido",
    async () => {
        //mockando as funções de busca
        Profissional.buscar_profissional_cpf.mockResolvedValue(null);
        Profissional.buscar_profissional_cro.mockResolvedValue(null);
        Profissional.buscar_profissional_cns.mockResolvedValue(null);
        Profissional.criar_profissional.mockResolvedValue({
            id: 1,
            nome: "João Silva"
        });

    const profissional =
      await criarProfissional({

        cpf: "12345678901",
        nome: "João Silva",
        cro: "PE-12345",
        cro_uf: "PE",
        cbo: "Dentista",
        matricula: null,
        tipo: "profissional",
        cns: "123456789012345"

      });
    
    //espera-se que o profissional criado tenha o nome seja "João Silva"
    expect(profissional.nome).toBe("João Silva");

  }
);

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
    test("Deve exibir erro por duplicidade - cpf já cadastrado.",
    async () => {

    //mockando a função de busca por cpf para simular que já existe um profissional com o cpf fornecido
    Profissional.buscar_profissional_cpf.mockResolvedValue({
        id: 1
      });

        await expect(criarProfissional({
                cpf: "12345678901",
                nome: "João Silva",
                cro: "PE-12345",
                cro_uf: "PE",
                cbo: "Dentista",
                cargo: "Dentista",
                tipo: "profissional",
                cns: "123456789012345"

            })

        ).rejects.toThrow("CPF já cadastrado.");

    });

    //Teste 6
    test("Deve exibir erro por duplicidade - cro já cadastrado.", 
    async () => {

    //mockando a função de busca por cpf para simular que já existe um profissional com o cpf fornecido
    Profissional.buscar_profissional_cpf.mockResolvedValue({
        id: 1
      });

        await criarProfissional({
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
