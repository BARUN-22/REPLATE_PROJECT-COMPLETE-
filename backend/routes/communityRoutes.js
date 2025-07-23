const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost
} = require('../controllers/communityController');

router.post('/community', createPost);

router.get('/community', getAllPosts);

router.put('/community/:id', updatePost);

router.delete('/community/:id', deletePost);

module.exports = router;
