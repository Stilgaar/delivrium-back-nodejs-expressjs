const express = require('express');
const router = express.Router();
const comment = require('../controlleurs/comment')

// routes de la collection COMMENT

router.post('/', comment.newCom)

router.post('/get', comment.getCom)

module.exports = router;
  