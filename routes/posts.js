const express = require('express');
const router = express.Router();
const posts = require('../controlleurs/posts')

// Routes pour la collection POSTS 

router.post('/', posts.newPost )

router.get('/critic', posts.getCrits) 

router.get('/criticId', posts.getCritID)

module.exports = router;