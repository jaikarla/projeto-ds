import express from "express";
const router = express.Router();

/*
//rota para obter todos os procedimentos
router.get("/", (req, res) => {});

//rota para obter um procedimento específico
router.get("/:id", (req, res) => {});

//rota para criar um novo procedimento
router.post("/", (req, res) => {});

//rota para atualizar um procedimento existente
router.put("/:id", (req, res) => {});

//rota para excluir um procedimento
router.delete("/:id", (req, res) => {});
*/ 

//-------------- ROTAS PARA TESTES --------------
//essas rotas são apenas para fins de teste e devem ser removidas ou substituídas por implementações reais posteriormente
//mantenhas como comentário. Use-as apenas p/ verificar as rotas quando necessário. lembre-se de comentar as de cima para realizar os teste com as de baixo, e vice-versa.

router.get("/", (req, res) => {
  res.status(200).json({ message: "Listando procedimentos" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Buscando procedimento ${req.params.id}` });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "Procedimento criado com sucesso" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: `Procedimento ${req.params.id} atualizado` });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: `Procedimento ${req.params.id} removido` });
});

export default router;