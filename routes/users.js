var express = require('express');
var router = express.Router();
const users = require('../controlleurs/users')

// Routes pour la collection USERS

/* GET users listing. */
router.post('/', users.treatForm )

router.get('/', function (req, res, next) {
  res.send('merci') })

router.post('/login', users.treatLogin )

// je l'ai rajouté sur cette route mais ya le
// treatuserId qui doit gener
router.get('/id', users.treatUserId )

router.get('/info', users.checkToken)

module.exports = router;
