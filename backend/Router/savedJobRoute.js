import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  saveJob, 
  getSavedJobs, 
  unsaveJob, 
  checkIfSaved,
  getSavedJobIds
} from '../controller/savedJobController.js';

const router = express.Router();

router.post('/save', protect, saveJob);
router.get('/my-saved-jobs', protect, getSavedJobs);
router.get('/saved-ids', protect, getSavedJobIds);
router.get('/check/:jobId', protect, checkIfSaved);
router.delete('/unsave/:jobId', protect, unsaveJob);

export default router;
