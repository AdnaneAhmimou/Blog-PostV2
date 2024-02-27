const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); 
const postController = require('../controller/postController');

// Apply authMiddleware to all routes
router.use(authMiddleware);

// GET all posts
router.get('/', postController.getAllPosts);

// GET post by ID
router.get('/:id', postController.getPostById);

// POST create new post
router.post('/', postController.createPost);

// PUT update post
router.put('/:id', postController.updatedPost);

// DELETE delete post
router.delete('/:id', postController.deletePost);

module.exports = router;
