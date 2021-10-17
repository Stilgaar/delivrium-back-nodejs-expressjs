const express = require('express');
const router = express.Router();
const comment = require('../controlleurs/comment')

// routes de la collection COMMENT

router.post('/', comment.newCom)

router.get('/get', comment.getCom)

module.exports = router;
  