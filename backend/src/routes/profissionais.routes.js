import express from "express";
const router = express.Router();

/*
//rota para obter todos os profissionais
router.get("/", (req, res) => {});

//rota para obter um profissional específico
router.get("/:id", (req, res) => {});

//rota para criar um novo profissional
router.post("/", (req, res) => {});

//rota para atualizar um profissional existente
router.put("/:id", (req, res) => {});

//rota para excluir um profissional
router.delete("/:id", (req, res) => {});
*/ 

//-------------- ROTAS PARA TESTES --------------
//essas rotas são apenas para fins de teste e devem ser removidas ou substituídas por implementações reais posteriormente
//mantenhas como comentário. Use-as apenas p/ verificar as rotas quando necessário. lembre-se de comentar as de cima para realizar os teste com as de baixo, e vice-versa.

router.get("/", (req, res) => {
  res.status(200).json({ message: "Listando profissionais" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Buscando profissional ${req.params.id}` });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "Profissional criado com sucesso" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: `Profissional ${req.params.id} atualizado` });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: `Profissional ${req.params.id} removido` });
});

export default router;