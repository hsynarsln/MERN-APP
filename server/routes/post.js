import express from 'express';
//! .js uzantısı önemli
import { createPost, deletePost, getPosts, likePost, updatePost } from '../controllers/posts.js';
//! eğer kullanıcı yetkisi varsa o işlemleri yapabilir.
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', checkAuth, createPost);
router.patch('/:id', checkAuth, updatePost);
router.delete('/:id', checkAuth, deletePost);
router.put('/:id/likePost', checkAuth, likePost);

export default router;
