import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { 
  applyForJob, 
  getMyApplications, 
  getJobApplications, 
  getEmployerApplications,
  updateApplicationStatus, 
  deleteApplication,
  checkApplicationStatus 
} from '../controller/applicationController.js'

const router = express.Router()

// Seeker routes
router.post('/apply', protect, applyForJob)
router.get('/my-applications', protect, getMyApplications)
router.delete('/:id', protect, deleteApplication)
router.get('/check/:jobId', protect, checkApplicationStatus)

// Employer routes
router.get('/job/:jobId', protect, getJobApplications)
router.get('/employer/all', protect, getEmployerApplications)
router.put('/:id/status', protect, updateApplicationStatus)

export default router
