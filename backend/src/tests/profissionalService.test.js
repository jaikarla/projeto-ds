import { describe, test, expect, beforeEach, vi } from "vitest";

import { criarProfissional } from "../services/profissionalService";
import { atualizarProfissional } from "../services/profissionalService"; //função atualizar

import Profissional from '../models/profissional.js'; 

//MOCKS -----------
vi.mock('../models/profissional.js', () => ({
  default: {
    buscar_profissional_cpf: vi.fn(),
    buscar_profissional_cro: vi.fn(),
    buscar_profissional_cns: vi.fn(),
    buscar_estudante_matricula: vi.fn(),
    criar_profissional: vi.fn(),
    atualizar_dados_profissional: vi.fn()
  }
}));


describe("Testes para criar profissional", () => {

    beforeEach(() => { vi.clearAllMocks(); });

    test("Deve criar um profissional válido", async () => {

        Profissional.buscar_profissional_cpf.mockResolvedValue(null);
        Profissional.buscar_profissional_cro.mockResolvedValue(null);
        Profissional.buscar_profissional_cns.mockResolvedValue(null);
        Profissional.criar_profissional.mockResolvedValue({
            id: 1,
            nome: "João Silva"
        });

    const profissional = await criarProfissional({

        nome: 'João Silva',
        cpf: '12345678901',
        cbo: 'Dentista',
        tipo: 'Profissional',
        matricula: '',
        cns: '123456789012345',
        cro: 'PE-12345',
        cro_uf: 'PE'

      });
    
    expect(profissional.nome).toBe("João Silva");

  }
);

    //teste 2
    test("Deve exibir erro qundo campo obrigatório estiver vazio", async () => {

        await expect(criarProfissional({
            nome: '',
            cpf: '12345678901',
            cbo: 'Dentista',
            tipo: 'Profissional',
            matricula: '',
            cns: '123456789012345',
            cro: 'PE-12345',
            cro_uf: 'PE'
        
        })).rejects.toThrow("Todos os campos obrigatórios devem ser preenchidos.");
    
    });

    //Teste 3
    test("Deve exibir erro para CPF inválido.", async () => {

        await expect(criarProfissional({
            nome: 'Raiana Lima',
            cpf: '1234567890🪲',
            cbo: 'Dentista',
            tipo: 'Estudante',
            matricula: '1234567890',
            cns: '123456789012345',
            cro: '',
            cro_uf: ''
        
        })).rejects.toThrow("CPF inválido. Deve conter exatamente 11 dígitos numéricos.");
    });

    //Teste 4
    test("Deve exibir erro para CROinválido.", async () => {
        
        await expect(criarProfissional({
            nome: 'João Silva',
            cpf: '12345678901',
            cbo: 'Dentista',
            tipo: 'Profissional',
            matricula: '1234567890',
            cns: '123456789012345',
            cro: 'PEC-12345',
            cro_uf: 'PE'

        })).rejects.toThrow("CRO inválido. Use XX-12345.");
    });

    //Teste 5
    test("Deve exibir erro para CNS inválido.",  async () => {
        
        await expect(criarProfissional({
            nome: 'João Silva',
            cpf: '12345678901',
            cbo: 'Dentista',
            tipo: 'Profissional',
            matricula: '1234567890',
            cns: '123456789012🍎',
            cro: 'PEC-12345',
            cro_uf: 'PE'

            })).rejects.toThrow("CNS deve conter 15 dígitos numéricos.")
    })

    //Teste 6
    test("Deve exibir erro para tipo inválido.", async () => {

        await expect(criarProfissional({
            nome: 'João Silva',
            cpf: '12345678901',
            cbo: 'Dentista',
            tipo: 'Admin',
            matricula: '1234567890',
            cns: '123456789012345',
            cro: 'PEC-12345',
            cro_uf: 'PE'

        })).rejects.toThrow("Tipo deve ser profissional ou estudante.");
    });

    //Teste 7
    test('Deve exibir erro quando estudante não informar matrícula.', async () => {

    await expect(criarProfissional({
        nome: 'Maria Souza',
        cpf: '12345678901',
        cbo: 'Estudante',
        tipo: 'estudante',
        cns: '123456789012345'

      })).rejects.toThrow('Matrícula é obrigatória para estudante.');
    });

    //Teste 8
    test('Deve exibir erro quando profissional não informar CRO.', async () => {

        await expect(criarProfissional({
            nome: 'João Silva',
            cpf: '12345678901',
            cbo: 'Dentista',
            tipo: 'profissional',
            cns: '123456789012345',
            cro_uf: 'PE'

        })).rejects.toThrow('Todos os campos obrigatórios devem ser preenchidos.');
    });

    //Teste 9
    test('Deve permitir estudante sem CRO e CRO-UF', async () => {

        Profissional.buscar_profissional_cpf.mockResolvedValue(null);
        Profissional.buscar_profissional_cns.mockResolvedValue(null);

        Profissional.criar_profissional.mockResolvedValue({
            id: 2,
            nome: 'Maria Souza'
        });

        const resultado = await criarProfissional({
        nome: 'Maria Souza',
        cpf: '12345678901',
        cbo: 'Estudante',
        tipo: 'estudante',
        cns: '123456789012345',
        matricula: '20250001'
        });

        expect(resultado.id).toBe(2);
    });

    //Teste 10
    test('Deve exibir erro para CPF duplicado', async () => {

        Profissional.buscar_profissional_cpf.mockResolvedValue({
            id: 1
        });

        await expect(criarProfissional({
            nome: 'João Silva',
            cpf: '12345678901',
            cbo: 'Dentista',
            tipo: 'profissional',
            cns: '123456789012345',
            cro: 'PE-12345',
            cro_uf: 'PE'

        })).rejects.toThrow('CPF já cadastrado.');
    });

    //Teste 11
    test('Deve exibir erro para CNS duplicado', async () => {

        Profissional.buscar_profissional_cpf.mockResolvedValue(null);
        Profissional.buscar_profissional_cns.mockResolvedValue({
            id: 1
        });

        await expect(criarProfissional({
            nome: 'João Silva',
            cpf: '12345678902',
            cbo: 'Dentista',
            tipo: 'profissional',
            cns: '123456789012345',
            cro: 'PE-12345',
            cro_uf: 'PE'

        })).rejects.toThrow('CNS já cadastrado.');
    });

    //Teste 12
    test('Deve exibir erro para CRO duplicado', async () => {

        Profissional.buscar_profissional_cpf.mockResolvedValue(null);
        Profissional.buscar_profissional_cns.mockResolvedValue(null);

        Profissional.buscar_profissional_cro.mockResolvedValue({
            id: 1
        });

        await expect(criarProfissional({
            nome: 'João Silva',
            cpf: '12345678903',
            cbo: 'Dentista',
            tipo: 'profissional',
            cns: '123456789012345',
            cro: 'PE-12345',
            cro_uf: 'PE'
            
        })).rejects.toThrow('CRO já cadastrado.');
    });

});


describe("Testes para atualizar profissional", () => {

    //Teste 1
    test('Deve atualizar um profissional válido.', async () => {

        Profissional.buscar_profissional_cpf.mockResolvedValue({
            id: 1
        });

        Profissional.buscar_profissional_cns.mockResolvedValue({
            id: 1
        });

        Profissional.buscar_profissional_cro.mockResolvedValue({
            id: 1
        });

        Profissional.atualizar_dados_profissional.mockResolvedValue({
            id: 1,
            nome: 'João Atualizado'
        });

        const resultado = await atualizarProfissional(
            1,
            {
            nome: 'João Atualizado',
            cpf: '12345678901',
            cbo: 'Dentista',
            tipo: 'profissional',
            cns: '123456789012345',
            cro: 'PE-12345',
            cro_uf: 'PE'
            }
        );

        expect(resultado.nome).toBe('João Atualizado');
    });

    //Teste 2
    test('Deve exibir erro para CPF já cadastrado por outro profissional.', async () => {

        Profissional.buscar_profissional_cpf.mockResolvedValue({
            id: 2
        });

        await expect(atualizarProfissional(
            1,
            {
                nome: 'João Silva',
                cpf: '12345678901',
                cbo: 'Dentista',
                tipo: 'profissional',
                cns: '123456789012345',
                cro: 'PE-12345',
                cro_uf: 'PE'

            })).rejects.toThrow('CPF já cadastrado.');
    });

    //Teste 3
    test('Deve exibir erro para CNS já cadastrado por outro profissional.', async () => {

        Profissional.buscar_profissional_cpf.mockResolvedValue({
            id: 1
        });

        Profissional.buscar_profissional_cns.mockResolvedValue({
            id: 2
        });

        await expect(atualizarProfissional(
            1,
            {
                nome: 'João Silva',
                cpf: '12345678901',
                cbo: 'Dentista',
                tipo: 'profissional',
                cns: '123456789012345',
                cro: 'PE-12345',
                cro_uf: 'PE'

            })).rejects.toThrow('CNS já cadastrado.');
    });

    //Teste 4
    test('Deve exibir erro para CRO já cadastrado por outro profissional.', async () => {

        Profissional.buscar_profissional_cpf.mockResolvedValue({
            id: 1
        });

        Profissional.buscar_profissional_cns.mockResolvedValue({
            id: 1
        });

        Profissional.buscar_profissional_cro.mockResolvedValue({
            id: 2
        });

        await expect(atualizarProfissional(
            1,
            {
                nome: 'João Silva',
                cpf: '12345678901',
                cbo: 'Dentista',
                tipo: 'profissional',
                cns: '123456789012345',
                cro: 'PE-12345',
                cro_uf: 'PE'
            })).rejects.toThrow('CRO já cadastrado.');
    });

    //Teste 5
    test('Deve exibir erro quando estudante não informar matrícula.', async () => {

        await expect(atualizarProfissional(
            1,
            {
                nome: 'Maria',
                cpf: '12345678901',
                cbo: 'Estudante',
                tipo: 'estudante',
                cns: '123456789012345'

            })).rejects.toThrow('Matrícula é obrigatória para estudante.');
    });

    //Teste 6
    test('Deve exibir erro para tipo inválido', async () => {

        await expect(
            atualizarProfissional(
            1,
            {
                nome: 'João',
                cpf: '12345678901',
                cbo: 'Dentista',
                tipo: 'admin',
                cns: '123456789012345'
            
            })).rejects.toThrow('Tipo deve ser profissional ou estudante.');
    });

});
