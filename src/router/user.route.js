import express from 'express';
import userController from '../controllers/user.controller.js';
import authMiddleware  from '../middlewares/auth.js';
const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.Login);
router.get('/', userController.getAllUsers);
router.get('/protected', authMiddleware, userController.protectedRoute);

export default router;
