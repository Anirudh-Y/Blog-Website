import express from 'express';
import { uploadImage, getImage } from '../controller/image-controller.js';
import { signupUser, loginUser } from '../controller/user-controller.js';
import { authenticateToken  } from '../controller/jwt-controller.js';
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../controller/create-controller.js';
import { newComment, getAllComments } from '../controller/comment-controller.js';
import upload from '../utils/upload.js'

const router = express.Router();

router.post('/signup',signupUser);
router.post('/login',loginUser);

router.post('/file/upload',upload.single('file'),uploadImage)
router.get('/file/:filename',getImage);

router.post('/create',authenticateToken, createPost);
router.get('/posts',authenticateToken, getAllPosts);
router.get('/post/:id',authenticateToken, getPostById);
router.put('/update/:id', authenticateToken, updatePost)
router.delete('/delete/:id', authenticateToken, deletePost)

router.post('/comments/new', authenticateToken, newComment)
router.get('/comments', authenticateToken, getAllComments)

export default router;