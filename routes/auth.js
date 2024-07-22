import express from 'express';
import { register, requestOTP, verifyOTP } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/request-otp', requestOTP);
router.post('/verify-otp', verifyOTP);

export default router;
