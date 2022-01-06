import express from 'express';
//! .js uzantısı önemli
import { signin, signup } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

export default router;
