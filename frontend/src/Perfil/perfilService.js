const API_URL = 'https://api.sistemabpa.com.br/api/perfil'; // Troca pela url original

export const perfilService = {
  /**
   * Puxa os dados do faturista do banco de dados
   */
  async getPerfil() {
    try {
      // QUANDO TIVER O BANCO REAL, DESCOMENTE AS LINHAS ABAIXO:
      // const token = localStorage.getItem('bpaAuthSession');
      // const response = await fetch(API_URL, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      // if (!response.ok) throw new Error('Erro ao buscar dados do banco');
      // return await response.json();

      // ENQUANTO NÃO TEM O BANCO: Simula o atraso da rede (500ms) e retornamos o formato do banco
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        nome_completo: 'Raiana Laís pereira Donato',
        email_usuario: 'raianalaispd@gmail.com',
        cpf_usuario: '14907809476',
        telefone_usuario: '81999998888',
        cep_endereco: '50000000',
        numero_endereco: '123',
        complemento_endereco: 'Bloco B, Apto 201'
      };
    } catch (error) {
      console.error("Erro no serviço de perfil:", error);
      throw error;
    }
  },

  /**
   * Salva as alterações do faturista de volta no banco de dados
   */
  async updatePerfil(dadosAtualizados) {
    try {
      // QUANDO TIVER O BANCO REAL, DESCOMENTE AS LINHAS ABAIXO:
      // const token = localStorage.getItem('bpaAuthSession');
      // const response = await fetch(API_URL, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(dadosAtualizados)
      // });
      // if (!response.ok) throw new Error('Erro ao salvar no banco');
      // return await response.json();

      // ENQUANTO NÃO TEM O BANCO: Simulamos que o banco salvou com sucesso
      await new Promise(resolve => setTimeout(resolve, 600));
      console.log("Dados salvos simulados no banco:", dadosAtualizados);
      return { success: true, data: dadosAtualizados };
    } catch (error) {
      console.error("Erro ao atualizar perfil no serviço:", error);
      throw error;
    }
  },

  /**
   * Altera a senha do faturista logado no sistema
   */
  async updateSenha(payloadSenha) {
    try {
      // QUANDO TIVER O BANCO REAL, DESCOMENTE AS LINHAS ABAIXO:
      // const token = localStorage.getItem('bpaAuthSession');
      // const response = await fetch(`${API_URL}/alterar-senha`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(payloadSenha)
      // });
      // if (!response.ok) throw new Error('Erro ao atualizar senha no banco');
      // return await response.json();

      // ENQUANTO NÃO TEM O BANCO: Simulação de sucesso
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log("Senha atualizada com sucesso no simulador:", payloadSenha);
      return { success: true };
    } catch (error) {
      console.error("Erro ao atualizar senha no serviço:", error);
      throw error;
    }
  },

  /**
   * Deleta a conta do usuário no banco
   */
  async deleteConta() {
    try {
      // QUANDO TIVER O BANCO REAL, DESCOMENTE AS LINHAS ABAIXO:
      // const token = localStorage.getItem('bpaAuthSession');
      // const response = await fetch(API_URL, {
      //   method: 'DELETE',
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      // if (!response.ok) throw new Error('Erro ao deletar conta');
      // return true;

      // ENQUANTO NÃO TEM O BANCO:
      await new Promise(resolve => setTimeout(resolve, 700));
      return { success: true };
    } catch (error) {
      console.error("Erro ao deletar conta no serviço:", error);
      throw error;
    }
  }
};