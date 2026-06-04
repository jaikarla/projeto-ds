import express from 'express'
import DashboardController from '../controllers/dashboardController.js'

const router = express.Router()

// GET /dashboard resume principal com filtro opcional de datas
router.get('/', DashboardController.getResumo.bind(DashboardController))

// GET /dashboard/estatisticas para estatísticas detalhadas por data
router.get('/estatisticas', DashboardController.getEstatisticasPorData.bind(DashboardController))

export default router
