import express from "express";
import rotasProjeto from "./routes/index.js";
import { logger } from "./middlewares/logMiddleware.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import './config/db.js'

const app = express();

app.use(express.json()); //p/ ler o jason
app.use(logger); //middleware para logar as requisições
app.use('/api', rotasProjeto); //prefixo para as rotas do projeto
app.use(errorHandler); //middleware para tratamento de erros

export default app;

