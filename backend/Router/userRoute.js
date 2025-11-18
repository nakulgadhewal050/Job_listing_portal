import express from 'express';
import { getCurrentUser } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';


const userRouter = express.Router();

userRouter.get('/currentuser', protect, getCurrentUser)

export default userRouter;