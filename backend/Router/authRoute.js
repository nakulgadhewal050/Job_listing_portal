import express from 'express';
import { googleAuth, Login, Logout, Signup } from '../controller/userAuthController.js';
import { protect } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/signup',Signup);
authRouter.post('/login', Login);
authRouter.get('/protect', protect,);
authRouter.post('/logout', Logout);
authRouter.post('/googleAuth', googleAuth);

export default authRouter;

