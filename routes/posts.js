var express = require('express');
var router = express.Router();
const posts = require('../controlleurs/posts')

// Routes pour la collection POSTS 

router.post('/', posts.newPost )

router.post('/comment', posts.newComment )

router.get('/critic', posts.getCrits) 

router.get('/criticId', posts.getCritID)

module.exports = router;