import express from 'express'
import multer from 'multer'
import path from 'path'
import { protect } from '../middleware/authMiddleware.js'
import { getMe, updateMe, uploadResume, uploadPhoto } from '../controller/profileController.js'

const router = express.Router()

const resumeFilter = (req, file, cb) => {
  const allowed = ['.pdf', '.doc', '.docx']
  const ext = path.extname(file.originalname).toLowerCase()
  if (!allowed.includes(ext)) return cb(new Error('Invalid file type'))
  cb(null, true)
}

 const photoStorage = multer.memoryStorage()
 const resumeStorage = multer.memoryStorage()

const photoFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase()
  const allowed = ['.jpg', '.jpeg', '.png', '.webp']
  if (!allowed.includes(ext)) return cb(new Error('Invalid image type'))
  cb(null, true)
}

const uploadResumeMulter = multer({ storage: resumeStorage, fileFilter: resumeFilter, limits: { fileSize: 5 * 1024 * 1024 } })
const uploadPhotoMulter = multer({ storage: photoStorage, fileFilter: photoFilter, limits: { fileSize: 3 * 1024 * 1024 } })

router.get('/me', protect, getMe)
router.put('/me', protect, updateMe)
router.post('/resume', protect, uploadResumeMulter.single('resume'), uploadResume)
router.post('/photo', protect, uploadPhotoMulter.single('photo'), uploadPhoto)

export default router
