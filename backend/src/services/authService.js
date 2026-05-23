import db from '../config/db.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthService {
  async login(email, senha) {
    // Busca o faturista pelo email
    const query = 'SELECT * FROM faturistas WHERE email = $1';
    const { rows } = await db.query(query, [email]);

    const faturista = rows[0];

    if (!faturista) {
      throw new Error('Credenciais inválidas');
    }

    // Verifica a senha com bcrypt
    const senhaValida = await bcrypt.compare(senha, faturista.senha);
    if (!senhaValida) {
      throw new Error('Credenciais inválidas');
    }

    // Gera o token JWT apenas com os dados necessários
    const token = jwt.sign(
      { id: faturista.id, email: faturista.email, nome: faturista.nome },
      process.env.JWT_SECRET || 'chave_secreta_padrao', 
      { expiresIn: '8h' }
    );

    return { 
      token, 
      faturista: { id: faturista.id, nome: faturista.nome, email: faturista.email } 
    };
  }
}
export default new AuthService();