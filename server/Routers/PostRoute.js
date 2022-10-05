import express from "express";

import { createPost, deletePost, getComment, getPost, getTimelinePost, likePost, updatePost } from "../Controllers/PostController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";
const router = express.Router();


router.post('/', createPost);
router.get('/:id', getPost);
// router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like', likePost);
router.get('/:id/timeline',getTimelinePost);
router.post('/comment', getComment)

export default router; 