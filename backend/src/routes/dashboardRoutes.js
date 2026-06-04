import express from 'express'
import DashboardController from '../controllers/dashboardController.js'

const router = express.Router()

// GET /dashboard - Resume principal com filtro opcional de datas
router.get('/', DashboardController.getResumo.bind(DashboardController))

// GET /dashboard/estatisticas - Estatísticas detalhadas por data
router.get('/estatisticas', DashboardController.getEstatisticasPorData.bind(DashboardController))

export default router
