var express = require('express');
var router = express.Router();
const posts = require('../controlleurs/posts')



router.post('/', posts.newPost )
{console.log("Nouveau post créé")}

router.post('/comment', posts.newComment )
{console.log("Nouveau commentaire créé")}

module.exports = router;