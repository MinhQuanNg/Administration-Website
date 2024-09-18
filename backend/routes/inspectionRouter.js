import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as dataController from '../controllers/inspection/dataController.js'
import * as productControlelr from '../controllers/inspection/productController.js'

const router = express.Router()

// PRODUCTS
router.get('/products', protect, dataController.getProducts)
router.get('/products/:id/sampleCount', protect, productControlelr.getRequiredSampleCount)

// DOSSIERS
router.get('/dossiers', protect, dataController.getDossiers)
router.post('/dossiers', protect, dataController.createDossier)

// more specific routes defined before more general routes
router.delete('/dossiers/assignees', protect, dataController.removeTaskAssignee)

router.patch('/dossiers/:id', protect, dataController.updateDossier)
router.delete('/dossiers/:id', protect, dataController.deleteDossier)


// TASKS
router.get('/tasks', protect, dataController.getTasks)
router.get('/tasks/unstarted', protect, dataController.checkUnstartedTasks)
router.delete('/tasks/assignees', protect, dataController.removeTaskAssignee)

router.patch('/tasks/:id', protect, dataController.updateTask)


// USERS
router.get('/users', protect, dataController.getUsers)

export default router