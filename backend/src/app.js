//app.use(logger);
//app.use('/api', rotasProjeto);
//app.use(errorHandler);
//============================================

// apenas para teste de conexao com o banco de dados
const express = require('express')
const app = express()

require('./config/db')

app.use(express.json())


app.get('/', (req, res) => {
  res.json({ mensagem: 'BPA funcionando' })
})

module.exports = app