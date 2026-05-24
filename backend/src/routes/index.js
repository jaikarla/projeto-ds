import express from "express";

import authRoutes from "./auth.routes.js";
import profissionaisRoutes from "./profissionais.routes.js";
import estudantesRoutes from "./estudantes.routes.js";
import pacientesRoutes from "./pacientes.routes.js";
import procedimentosRoutes from "./procedimentos.routes.js";
import bpaRoutes from "./bpa.routes.js";
import faturistaRoutes from "./faturistaRoutes.js";

const router = express.Router();

//defini as rotas para cada recurso
router.use("/auth", authRoutes);
router.use("/profissionais", profissionaisRoutes);
router.use("/estudantes", estudantesRoutes);
router.use("/pacientes", pacientesRoutes);
router.use("/procedimentos", procedimentosRoutes);
router.use("/bpa", bpaRoutes);
router.use("/faturistas", faturistaRoutes);

export default router;