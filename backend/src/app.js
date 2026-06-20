import express from "express";
import rotasProjeto from "./routes/index.js";
import { logger } from "./middlewares/logMiddleware.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import './config/db.js';

const app = express();

// CORS - Permitir requisições do Postman, Frontend, etc
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json()); //p/ ler o jason
app.use(logger); //middleware para logar as requisições
app.use('/api', rotasProjeto); //prefixo para as rotas do projeto
app.use(errorHandler); //middleware para tratamento de erros

export default app;
