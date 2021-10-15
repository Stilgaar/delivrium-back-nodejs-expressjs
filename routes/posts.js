var express = require('express');
var router = express.Router();
const posts = require('../controlleurs/posts')



router.post('/', posts.newPost )
{console.log("Nouveau post créé")}

router.post('/comment', posts.newComment )
{console.log("Nouveau commentaire créé")}

router.get('/critic', posts.getCrits) 
{console.log('récuperation des posts dans la BD')}

module.exports = router;