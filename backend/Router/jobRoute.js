import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { createJob, getMyJobs, getAllJobs, getJobById, updateJob, deleteJob } from '../controller/jobController.js'

const router = express.Router()

// Employer routes
router.post('/', protect, createJob)
router.get('/my-jobs', protect, getMyJobs)
router.put('/:id', protect, updateJob)
router.delete('/:id', protect, deleteJob)

// Public routes
router.get('/', getAllJobs)
router.get('/:id', getJobById)

export default router
