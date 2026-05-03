import './App.css'; // Estilos gerais 
import './CadastroFaturista.css'; // Estilos específicos desta tela

function CadastroFaturista() {
  return (
    <div className="container-center">
      <div className="card-form">
        <img src="/logo-bpa.png" alt="BPA" className="logo-bpa" />
        <h2>Criar Conta</h2>
        
        <form>
            {/* Usando os estilos que definiu no App.css para manter o padrão */}
            {/* Campo de Nome Completo*/}
            <div className="input-group">
            <label htmlFor="nome">Nome Completo *</label>
            <input type="text" id="nome" name="nome_completo" required />
            </div>

            {/* Campo de Email */}
            <div className="input-group">
            <label htmlFor="email">E-mail *</label>
            <input type="email" id="email" name="email" required />
            </div>

            {/* Campo de CPF */}
            <div className="form-row">
            <div className="input-group" style={{ flex: 1 }}>
                <label htmlFor="cpf">CPF *</label>
                <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" required />
            </div>

            {/* Campo de Telefone */}
            <div className="input-group" style={{ flex: 1 }}>
                <label htmlFor="telefone">Telefone *</label>
                <input type="text" id="telefone" name="telefone" placeholder="11999999999" required />
            </div>
            </div>

            {/* Campo de Senha */}
            <div className="input-group">
            <label htmlFor="senha">Senha *</label>
            <input type="password" id="senha" name="senha" required />
            
            {/* Lista de requisitos que aparece na imagem */}
            <ul className="password-requirements" style={{ textAlign: 'left', listStyle: 'none', padding: 0, marginTop: '10px', fontSize: '13px', color: '#888' }}>
                <li>x Mínimo de 6 caracteres</li>
                <li>x Pelo menos 1 letra maiúscula</li>
                <li>x Pelo menos 1 letra minúscula</li>
                <li>x Pelo menos 1 símbolo</li>
            </ul>
            </div>

            {/* Campo de Confimar Senha */}
            <div className="input-group">
            <label htmlFor="confirmar_senha">Confirmar Senha *</label>
            <input type="password" id="confirmar_senha" name="confirmar_senha" required />
            </div>

            {/* Campo de Endereço (CEP, Número, Complemento)*/}
            <p className="section-label" style={{ textAlign: 'left', margin: '20px 0 10px', color: '#666', fontSize: '14px' }}>
            Endereço (opcional)
            </p>

            <div className="form-row">
                {/* CEP - Ocupa um espaço médio */}
                <div className="input-group" style={{ flex: 2 }}>
                    <label htmlFor="cep">CEP</label>
                    <input type="text" id="cep" name="cep" placeholder="00000000" />
                </div>

                {/* Número - Ocupa um espaço menor */}
                <div className="input-group" style={{ flex: 1 }}>
                    <label htmlFor="numero">Número</label>
                    <input type="text" id="numero" name="numero" />
                </div>

                {/* Complemento - Ocupa um espaço médio */}
                <div className="input-group" style={{ flex: 2 }}>
                    <label htmlFor="complemento">Complemento</label>
                    <input type="text" id="complemento" name="complemento" />
                </div>
            </div>
          

          <button type="submit" className="btn-submit">Criar Conta</button>
        </form>
      </div>
    </div>
  );
}

export default CadastroFaturista;