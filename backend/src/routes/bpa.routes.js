import express from "express";
const router = express.Router();

/*
//----CRUD básico
//rota para obter todos os BPAs
router.get("/", (req, res) => {});

//rota para obter um BPA específico
router.get("/:id", (req, res) => {});

//rota para criar um novo BPA
router.post("/", (req, res) => {});

//rota para atualizar um BPA existente
router.delete("/:id", (req, res) => {});

//----Regras de negócio do BPA
router.post("/calcular", (req, res) => {});
router.get("/relatorio", (req, res) => {});
router.get("/exportar", (req, res) => {});
*/ 

//-------------- ROTAS PARA TESTES --------------
//essas rotas são apenas para fins de teste e devem ser removidas ou substituídas por implementações reais posteriormente
//mantenhas como comentário. Use-as apenas p/ verificar as rotas quando necessário. lembre-se de comentar as de cima para realizar os teste com as de baixo, e vice-versa.

router.get("/", (req, res) => {
  res.status(200).json({ message: "Listando BPAs" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Buscando BPA ${req.params.id}` });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "BPA criado com sucesso" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: `BPA ${req.params.id} atualizado` });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: `BPA ${req.params.id} removido` });
});

router.get("/", (req, res) => {
  res.json({ message: "Listando BPAs" });
});

router.post("/calcular", (req, res) => {
  res.json({ message: "Cálculo do BPA realizado" });
});

router.get("/relatorio", (req, res) => {
  res.json({ message: "Gerando relatório" });
});
export default router;